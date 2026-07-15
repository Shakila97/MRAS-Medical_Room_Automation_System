"""
MRAS v3.0 — Inventory Service
FEFO-ranked GRN receive, stock management, expiry watch.
"""
from datetime import datetime, timezone, date, timedelta
from typing import List, Optional, Any
import re

from fastapi import HTTPException, status
from beanie import PydanticObjectId

from src.models import Drug, InventoryItem, GRN, GRNLot, GRNStatus, AuditLog
from src.models.user import User
from src.schemas.inventory import GRNCreate, ExpiryEntry


async def list_inventory(
    db: Any = None,
    q: Optional[str] = None,
    inv_status: Optional[str] = None,
    expiring_within_days: Optional[int] = None,
    skip: int = 0,
    limit: int = 50,
) -> List[InventoryItem]:
    query = InventoryItem.find()
    
    if q:
        query = query.find({"drug_name": re.compile(q, re.IGNORECASE)})
    
    # Needs a bit of custom querying for inv_status since total_quantity <= reorder_level 
    # translates to $expr in MongoDB, but we can also use basic properties if we keep things simple
    if inv_status == "low":
        query = query.find({"$expr": {"$lte": ["$total_quantity", "$reorder_level"]}})
    if inv_status == "critical":
        query = query.find(InventoryItem.total_quantity == 0)
        
    return await query.skip(skip).limit(limit).to_list()


def _stock_status(item: InventoryItem) -> str:
    if item.total_quantity == 0:
        return "critical"
    if item.total_quantity <= item.reorder_level:
        return "low"
    return "ok"


async def get_expiring(db: Any = None, days: int = 90) -> List[ExpiryEntry]:
    cutoff = datetime.combine(date.today() + timedelta(days=days), datetime.min.time())
    
    lots = await GRNLot.find(
        GRNLot.expiry_date <= cutoff,
        GRNLot.remaining_qty > 0
    ).sort(+GRNLot.expiry_date).to_list()
    
    entries = []
    today = date.today()
    for lot in lots:
        # Convert datetime/date safely
        exp_date = lot.expiry_date
        if isinstance(exp_date, datetime):
            exp_date = exp_date.date()
            
        entries.append(ExpiryEntry(
            lot_id=str(lot.id),
            drug_name=lot.drug_name,
            lot_no=lot.lot_no,
            quantity=lot.remaining_qty,
            expiry_date=exp_date,
            days_until_expiry=(exp_date - today).days,
            fefo_rank=lot.fefo_rank,
        ))
    return entries


async def create_grn(data: GRNCreate, user: User, db: Any = None) -> GRN:
    grn = GRN(
        po_number=data.po_number,
        supplier=data.supplier,
        notes=data.notes,
        received_by=user.id,
        status=GRNStatus.DRAFT,
    )
    await grn.insert()

    for lot_data in data.lots:
        lot = GRNLot(
            grn_id=grn.id,
            remaining_qty=lot_data.quantity,
            **lot_data.model_dump(),
        )
        await lot.insert()

    return grn


async def add_lot(grn_id: str | PydanticObjectId, lot_data, db: Any = None) -> GRN:
    grn = await _get_grn_or_404(grn_id)
    if grn.status == GRNStatus.POSTED:
        raise HTTPException(status.HTTP_409_CONFLICT, "GRN already posted")
        
    lot = GRNLot(grn_id=grn.id, remaining_qty=lot_data.quantity, **lot_data.model_dump())
    await lot.insert()
    return grn


async def post_grn(grn_id: str | PydanticObjectId, user: User, db: Any = None) -> GRN:
    """Post GRN: update inventory totals and compute FEFO ranks per drug."""
    grn = await _get_grn_or_404(grn_id)
    if grn.status == GRNStatus.POSTED:
        raise HTTPException(status.HTTP_409_CONFLICT, "Already posted")

    # Load lots
    lots = await GRNLot.find(GRNLot.grn_id == grn.id).to_list()

    # Group lots by drug and recompute FEFO ranks
    drug_lots = {}
    for lot in lots:
        drug_lots.setdefault(lot.drug_id, []).append(lot)

    for drug_id, drug_lot_list in drug_lots.items():
        # Load ALL existing lots for this drug to rerank globally
        all_lots = await GRNLot.find(
            GRNLot.drug_id == drug_id, 
            GRNLot.remaining_qty > 0
        ).sort(+GRNLot.expiry_date).to_list()
        
        for rank, lot in enumerate(all_lots, start=1):
            lot.fefo_rank = rank
            await lot.save()

        # Update inventory total
        inv = await InventoryItem.find_one(InventoryItem.drug_id == drug_id)
        if inv:
            inv.total_quantity += sum(l.quantity for l in drug_lot_list)
            inv.updated_at = datetime.now(timezone.utc)
            await inv.save()
        else:
            # Auto-create inventory record
            drug = await Drug.get(drug_id)
            if drug:
                new_inv = InventoryItem(
                    drug_id=drug_id,
                    drug_name=drug.name,
                    total_quantity=sum(l.quantity for l in drug_lot_list),
                )
                await new_inv.insert()

    grn.status = GRNStatus.POSTED
    grn.posted_at = datetime.now(timezone.utc)
    await grn.save()

    # Audit
    await AuditLog(
        actor_id=user.id, actor_label=user.email,
        action="grn.post", target=f"grn:{str(grn.id)}", level="info",
    ).insert()

    return grn


async def _get_grn_or_404(grn_id: str | PydanticObjectId) -> GRN:
    oid = PydanticObjectId(grn_id) if isinstance(grn_id, str) else grn_id
    grn = await GRN.get(oid)
    if not grn:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "GRN not found")
    return grn
