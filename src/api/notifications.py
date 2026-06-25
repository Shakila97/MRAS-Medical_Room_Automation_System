"""
MRAS v3.0 — Notifications Router
REST endpoints + WebSocket live-push stream.
"""
from typing import List, Optional

from fastapi import APIRouter, Depends, Query, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_db
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
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    notifs = await list_notifications(db, notif_status, skip, limit)
    return [_fmt(n) for n in notifs]


@router.post("/{notif_id}/ack", summary="Acknowledge a notification")
async def ack(
    notif_id: int,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return _fmt(await ack_notification(notif_id, user, db))


@router.post("/{notif_id}/resolve", summary="Resolve a notification")
async def resolve(
    notif_id: int,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return _fmt(await resolve_notification(notif_id, user, db))


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
    return {
        "id": n.id,
        "kind": n.kind.value,
        "tone": n.tone.value,
        "title": n.title,
        "body": n.body,
        "target_role": json.loads(n.target_role),
        "stage": n.stage,
        "stages": json.loads(n.stages),
        "stage_index": n.stage_index,
        "cta": {"label": n.cta_label, "url": n.cta_url} if n.cta_label else None,
        "created_at": n.created_at.isoformat(),
        "acked_at": n.acked_at.isoformat() if n.acked_at else None,
        "resolved_at": n.resolved_at.isoformat() if n.resolved_at else None,
    }
