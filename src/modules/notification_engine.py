"""
MRAS v3.0 — Notification Engine
Create, acknowledge, and resolve closed-loop notifications.
WebSocket connection manager for live push to connected clients.
"""
import json
from datetime import datetime, timezone
from typing import Dict, List, Optional, Any

from fastapi import WebSocket, HTTPException, status
from beanie import PydanticObjectId

from src.models import Notification, NotificationKind, NotificationTone, AuditLog
from src.models.user import User


# ── WebSocket Connection Manager ──────────────────────────────────────────────

class ConnectionManager:
    """Manages active WebSocket connections, grouped by role."""

    def __init__(self):
        # role → list of active WebSocket connections
        self._connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, role: str) -> None:
        await websocket.accept()
        self._connections.setdefault(role, []).append(websocket)

    def disconnect(self, websocket: WebSocket, role: str) -> None:
        conns = self._connections.get(role, [])
        if websocket in conns:
            conns.remove(websocket)

    async def broadcast_to_role(self, role: str, event: dict) -> None:
        """Push a JSON event to all clients with the given role."""
        payload = json.dumps(event)
        dead = []
        for ws in self._connections.get(role, []):
            try:
                await ws.send_text(payload)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(ws, role)

    async def broadcast_to_roles(self, roles: List[str], event: dict) -> None:
        for role in roles:
            await self.broadcast_to_role(role, event)


# Global singleton — imported by the notifications router
manager = ConnectionManager()


# ── Notification CRUD ─────────────────────────────────────────────────────────

async def create_notification(
    kind: NotificationKind,
    title: str,
    body: str,
    target_roles: List[str],
    tone: NotificationTone = NotificationTone.INFO,
    cta_label: Optional[str] = None,
    cta_url: Optional[str] = None,
    db: Any = None,
) -> Notification:
    notif = Notification(
        kind=kind,
        tone=tone,
        title=title,
        body=body,
        target_role=json.dumps(target_roles),
        cta_label=cta_label,
        cta_url=cta_url,
    )
    
    await notif.insert()

    # Push to all connected clients of the target roles
    event = {
        "type": "notification",
        "data": {
            "id": str(notif.id),
            "kind": notif.kind.value,
            "tone": notif.tone.value,
            "title": notif.title,
            "body": notif.body,
        }
    }
    await manager.broadcast_to_roles(target_roles, event)

    return notif


async def list_notifications(
    db: Any = None,
    notif_status: Optional[str] = "open",
    skip: int = 0,
    limit: int = 30,
) -> List[Notification]:
    query = Notification.find()
    if notif_status == "open":
        query = query.find(Notification.resolved_at == None)
    elif notif_status == "resolved":
        query = query.find(Notification.resolved_at != None)
        
    return await query.sort(-Notification.created_at).skip(skip).limit(limit).to_list()


async def ack_notification(notif_id: str | PydanticObjectId, user: User, db: Any = None) -> Notification:
    notif = await _get_or_404(notif_id)
    if notif.acked_at:
        return notif
    notif.acked_at = datetime.now(timezone.utc)
    notif.acked_by = user.id
    notif.stage = "acknowledged"
    notif.stage_index = 1
    await notif.save()
    return notif


async def resolve_notification(notif_id: str | PydanticObjectId, user: User, db: Any = None) -> Notification:
    notif = await _get_or_404(notif_id)
    notif.resolved_at = datetime.now(timezone.utc)
    notif.stage = "resolved"
    notif.stage_index = 2
    await notif.save()

    await AuditLog(
        actor_id=user.id, actor_label=user.email,
        action="notification.resolve", target=f"notification:{str(notif_id)}",
        level="info",
    ).insert()
    return notif


async def _get_or_404(notif_id: str | PydanticObjectId) -> Notification:
    oid = PydanticObjectId(notif_id) if isinstance(notif_id, str) else notif_id
    notif = await Notification.get(oid)
    if not notif:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Notification not found")
    return notif
