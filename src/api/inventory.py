"""
MRAS v3.0 — Inventory Router
FEFO stock management, expiry alerts, and GRN processing.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_session
from src.core.security import require_roles

router = APIRouter()


@router.get("/", summary="List inventory", dependencies=[Depends(require_roles("pharmacy_staff", "admin"))])
async def list_inventory(session: AsyncSession = Depends(get_session)):
    # TODO: implement
    return {"message": "Inventory list — coming soon"}


@router.post("/grn", summary="Process GRN", dependencies=[Depends(require_roles("pharmacy_staff"))])
async def process_grn(session: AsyncSession = Depends(get_session)):
    # TODO: GRN processing
    return {"message": "GRN endpoint — coming soon"}


@router.get("/expiry-alerts", summary="Get near-expiry stock", dependencies=[Depends(require_roles("pharmacy_staff", "admin"))])
async def expiry_alerts(session: AsyncSession = Depends(get_session)):
    # TODO: FEFO expiry logic
    return {"message": "Expiry alerts — coming soon"}
