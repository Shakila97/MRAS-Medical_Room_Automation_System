"""
MRAS v3.0 — Notifications Router
REST endpoints + WebSocket live-push stream.
"""
from typing import List, Optional

from fastapi import APIRouter, Depends, Query, WebSocket, WebSocketDisconnect

from src.models.user import User, UserRole
from src.modules.auth_service import get_current_user, require_role
from src.modules.notification_engine import (
    manager, list_notifications, ack_notification, resolve_notification,
)
from src.models import Notification

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("/", summary="List notifications")
async def list_notifs(
    notif_status: Optional[str] = Query(default="open", alias="status"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=30, ge=1, le=100),
    _: User = Depends(get_current_user),
):
    notifs = await list_notifications(notif_status, skip, limit)
    return [_fmt(n) for n in notifs]


@router.post("/{notif_id}/ack", summary="Acknowledge a notification")
async def ack(
    notif_id: str,
    user: User = Depends(get_current_user),
):
    return _fmt(await ack_notification(notif_id, user))


@router.post("/{notif_id}/resolve", summary="Resolve a notification")
async def resolve(
    notif_id: str,
    user: User = Depends(get_current_user),
):
    return _fmt(await resolve_notification(notif_id, user))


@router.websocket("/stream")
async def ws_stream(websocket: WebSocket, role: str = "doctor"):
    """
    WebSocket endpoint for live notification push.
    Connect with: ws://localhost:8000/api/notifications/stream?role=doctor
    """
    await manager.connect(websocket, role)
    try:
        while True:
            # Keep connection alive by waiting for ping frames
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket, role)


def _fmt(n: Notification) -> dict:
    import json
    
    target_role = json.loads(n.target_role) if isinstance(n.target_role, str) else n.target_role
    stages = json.loads(n.stages) if isinstance(n.stages, str) else n.stages
    
    # Check for isoformat gracefully
    created_at_str = n.created_at.isoformat() if hasattr(n.created_at, 'isoformat') else str(n.created_at)
    acked_at_str = n.acked_at.isoformat() if n.acked_at and hasattr(n.acked_at, 'isoformat') else (str(n.acked_at) if n.acked_at else None)
    resolved_at_str = n.resolved_at.isoformat() if n.resolved_at and hasattr(n.resolved_at, 'isoformat') else (str(n.resolved_at) if n.resolved_at else None)
    
    return {
        "id": str(n.id),
        "kind": n.kind.value,
        "tone": n.tone.value,
        "title": n.title,
        "body": n.body,
        "target_role": target_role,
        "stage": n.stage,
        "stages": stages,
        "stage_index": n.stage_index,
        "cta": {"label": n.cta_label, "url": n.cta_url} if n.cta_label else None,
        "created_at": created_at_str,
        "acked_at": acked_at_str,
        "resolved_at": resolved_at_str,
    }
