"""
MRAS v3.0 — Inventory Router
Stock list, expiry watch, GRN receive/post, pharmacy dispense queue.
"""
from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_db
from src.models.user import User, UserRole
from src.modules.auth_service import require_role
from src.modules.inventory_service import (
    list_inventory, get_expiring, create_grn, add_lot, post_grn,
)
from src.schemas.inventory import (
    InventoryItemRead, ExpiryEntry, GRNCreate, GRNRead, GRNLotCreate,
)

router = APIRouter(tags=["Inventory & Pharmacy"])


@router.get("/inventory", response_model=List[InventoryItemRead],
            summary="List inventory items")
async def list_items(
    q: Optional[str] = Query(default=None),
    status: Optional[str] = Query(default=None, description="ok | low | critical"),
    expiring_within_days: Optional[int] = Query(default=None),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.PHARMACY, UserRole.DOCTOR, UserRole.ADMIN)),
):
    items = await list_inventory(db, q, status, expiring_within_days, skip, limit)
    return [
        InventoryItemRead(
            **item.model_dump(),
            status="critical" if item.total_quantity == 0
                   else "low" if item.total_quantity <= item.reorder_level
                   else "ok",
        )
        for item in items
    ]


@router.get("/inventory/expiring", response_model=List[ExpiryEntry],
            summary="Items expiring within N days (FEFO order)")
async def expiring(
    days: int = Query(default=90, ge=1, le=365),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.PHARMACY, UserRole.ADMIN)),
):
    return await get_expiring(db, days)


@router.post("/grn", response_model=GRNRead, status_code=201,
             summary="Create a draft GRN")
async def create(
    data: GRNCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_role(UserRole.PHARMACY, UserRole.ADMIN)),
):
    return await create_grn(data, user, db)


@router.post("/grn/{grn_id}/lots", response_model=GRNRead,
             summary="Add a lot to a draft GRN")
async def add(
    grn_id: int,
    lot_data: GRNLotCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_role(UserRole.PHARMACY, UserRole.ADMIN)),
):
    return await add_lot(grn_id, lot_data, db)


@router.post("/grn/{grn_id}/post", response_model=GRNRead,
             summary="Post GRN — updates inventory & FEFO ranks")
async def post(
    grn_id: int,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_role(UserRole.PHARMACY, UserRole.ADMIN)),
):
    return await post_grn(grn_id, user, db)
