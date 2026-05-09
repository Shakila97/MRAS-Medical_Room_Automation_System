"""
MRAS v3.0 — Consultations Router
Handles diagnoses, prescriptions, and drug-interaction alerts (OpenFDA).
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_session
from src.core.security import require_roles

router = APIRouter()


@router.get("/", summary="List consultations", dependencies=[Depends(require_roles("doctor"))])
async def list_consultations(session: AsyncSession = Depends(get_session)):
    # TODO: implement
    return {"message": "Consultations list — coming soon"}


@router.post("/", summary="Create consultation", dependencies=[Depends(require_roles("doctor"))])
async def create_consultation(session: AsyncSession = Depends(get_session)):
    # TODO: implement
    return {"message": "Create consultation — coming soon"}
