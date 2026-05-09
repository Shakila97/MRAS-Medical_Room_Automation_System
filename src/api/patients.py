"""
MRAS v3.0 — Patients Router
CRUD endpoints for employee health profiles, medical history, and QR check-in.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_session
from src.core.security import require_roles
from src.modules.patient_service import PatientService

router = APIRouter()


@router.get("/", summary="List all patients", dependencies=[Depends(require_roles("doctor", "admin"))])
async def list_patients(session: AsyncSession = Depends(get_session)):
    service = PatientService(session)
    return await service.get_all()


@router.get("/{patient_id}", summary="Get patient by ID", dependencies=[Depends(require_roles("doctor", "admin"))])
async def get_patient(patient_id: int, session: AsyncSession = Depends(get_session)):
    service = PatientService(session)
    return await service.get_by_id(patient_id)


@router.post("/checkin", summary="QR code check-in", dependencies=[Depends(require_roles("employee", "doctor"))])
async def checkin(session: AsyncSession = Depends(get_session)):
    # TODO: QR check-in logic
    return {"message": "Check-in endpoint — coming soon"}
