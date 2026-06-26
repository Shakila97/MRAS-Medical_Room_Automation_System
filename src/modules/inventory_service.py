"""
MRAS v3.0 — Inventory Service
FEFO-ranked GRN receive, stock management, expiry watch.
"""
from datetime import datetime, timezone, date, timedelta
from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select, func

from src.models import Drug, InventoryItem, GRN, GRNLot, GRNStatus, AuditLog
from src.models.user import User
from src.schemas.inventory import GRNCreate, GRNRead, ExpiryEntry


async def list_inventory(
    db: AsyncSession,
    q: Optional[str] = None,
    inv_status: Optional[str] = None,
    expiring_within_days: Optional[int] = None,
    skip: int = 0,
    limit: int = 50,
) -> List[InventoryItem]:
    stmt = select(InventoryItem)
    if q:
        stmt = stmt.where(InventoryItem.drug_name.ilike(f"%{q}%"))
    if inv_status == "low":
        stmt = stmt.where(InventoryItem.total_quantity <= InventoryItem.reorder_level)
    if inv_status == "critical":
        stmt = stmt.where(InventoryItem.total_quantity == 0)
    result = await db.execute(stmt.offset(skip).limit(limit))
    return result.scalars().all()


def _stock_status(item: InventoryItem) -> str:
    if item.total_quantity == 0:
        return "critical"
    if item.total_quantity <= item.reorder_level:
        return "low"
    return "ok"


async def get_expiring(db: AsyncSession, days: int = 90) -> List[ExpiryEntry]:
    cutoff = date.today() + timedelta(days=days)
    result = await db.execute(
        select(GRNLot)
        .where(GRNLot.expiry_date <= cutoff, GRNLot.remaining_qty > 0)
        .order_by(GRNLot.expiry_date.asc())
    )
    lots = result.scalars().all()
    entries = []
    today = date.today()
    for lot in lots:
        entries.append(ExpiryEntry(
            lot_id=lot.id,
            drug_name=lot.drug_name,
            lot_no=lot.lot_no,
            quantity=lot.remaining_qty,
            expiry_date=lot.expiry_date,
            days_until_expiry=(lot.expiry_date - today).days,
            fefo_rank=lot.fefo_rank,
        ))
    return entries


async def create_grn(data: GRNCreate, user: User, db: AsyncSession) -> GRN:
    grn = GRN(
        po_number=data.po_number,
        supplier=data.supplier,
        notes=data.notes,
        received_by=user.id,
        status=GRNStatus.DRAFT,
    )
    db.add(grn)
    await db.flush()
    await db.refresh(grn)

    for lot_data in data.lots:
        lot = GRNLot(
            grn_id=grn.id,
            remaining_qty=lot_data.quantity,
            **lot_data.model_dump(),
        )
        db.add(lot)

    return grn


async def add_lot(grn_id: int, lot_data, db: AsyncSession) -> GRN:
    grn = await _get_grn_or_404(grn_id, db)
    if grn.status == GRNStatus.POSTED:
        raise HTTPException(status.HTTP_409_CONFLICT, "GRN already posted")
    lot = GRNLot(grn_id=grn_id, remaining_qty=lot_data.quantity, **lot_data.model_dump())
    db.add(lot)
    return grn


async def post_grn(grn_id: int, user: User, db: AsyncSession) -> GRN:
    """Post GRN: update inventory totals and compute FEFO ranks per drug."""
    grn = await _get_grn_or_404(grn_id, db)
    if grn.status == GRNStatus.POSTED:
        raise HTTPException(status.HTTP_409_CONFLICT, "Already posted")

    # Load lots
    lots_result = await db.execute(select(GRNLot).where(GRNLot.grn_id == grn_id))
    lots = lots_result.scalars().all()

    # Group lots by drug and recompute FEFO ranks
    drug_lots: dict = {}
    for lot in lots:
        drug_lots.setdefault(lot.drug_id, []).append(lot)

    for drug_id, drug_lot_list in drug_lots.items():
        # Load ALL existing lots for this drug to rerank globally
        all_lots_result = await db.execute(
            select(GRNLot)
            .where(GRNLot.drug_id == drug_id, GRNLot.remaining_qty > 0)
            .order_by(GRNLot.expiry_date.asc())
        )
        all_lots = all_lots_result.scalars().all()
        for rank, lot in enumerate(all_lots, start=1):
            lot.fefo_rank = rank
            db.add(lot)

        # Update inventory total
        total = sum(l.remaining_qty for l in all_lots)
        inv_result = await db.execute(
            select(InventoryItem).where(InventoryItem.drug_id == drug_id)
        )
        inv = inv_result.scalar_one_or_none()
        if inv:
            inv.total_quantity += sum(l.quantity for l in drug_lot_list)
            inv.updated_at = datetime.now(timezone.utc)
            db.add(inv)
        else:
            # Auto-create inventory record
            drug_result = await db.execute(select(Drug).where(Drug.id == drug_id))
            drug = drug_result.scalar_one_or_none()
            if drug:
                new_inv = InventoryItem(
                    drug_id=drug_id,
                    drug_name=drug.name,
                    total_quantity=sum(l.quantity for l in drug_lot_list),
                )
                db.add(new_inv)

    grn.status = GRNStatus.POSTED
    grn.posted_at = datetime.now(timezone.utc)
    db.add(grn)

    # Audit
    db.add(AuditLog(
        actor_id=user.id, actor_label=user.email,
        action="grn.post", target=f"grn:{grn_id}", level="info",
    ))

    return grn


async def _get_grn_or_404(grn_id: int, db: AsyncSession) -> GRN:
    result = await db.execute(select(GRN).where(GRN.id == grn_id))
    grn = result.scalar_one_or_none()
    if not grn:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "GRN not found")
    return grn
