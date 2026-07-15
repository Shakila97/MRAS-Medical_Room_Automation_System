"""
MRAS v3.0 — Prescriptions Router
Drug search, Rx CRUD, interaction check, sign, pharmacy dispense queue.
"""
from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from beanie import PydanticObjectId

from src.models.user import User, UserRole
from src.modules.auth_service import get_current_user, require_role
from src.modules.prescription_service import (
    create_prescription, get_prescription, sign_prescription,
    check_interactions, search_drugs, dispense_prescription,
)
from src.schemas.prescription import (
    PrescriptionCreate, PrescriptionRead,
    InteractionCheckResult, DispenseResult, DrugRead,
)

router = APIRouter(tags=["Prescriptions"])


# ── Drug Catalogue ────────────────────────────────────────────────────────────

@router.get("/drugs", response_model=List[DrugRead], summary="Search drug catalogue")
async def drugs(
    q: Optional[str] = Query(default=None),
    atc: Optional[str] = Query(default=None),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.PHARMACY)),
):
    return await search_drugs(q, atc, skip=skip, limit=limit)


# ── Prescription CRUD ─────────────────────────────────────────────────────────

@router.get("/prescriptions/me", response_model=List[PrescriptionRead], summary="My active prescriptions")
async def my_prescriptions(
    user: User = Depends(get_current_user),
):
    from src.models import Patient, Prescription
    
    patient = await Patient.find_one(Patient.user_id == user.id)
    if not patient:
        return []

    return await Prescription.find(
        Prescription.patient_id == patient.id
    ).sort(-Prescription.signed_at).to_list()


@router.post("/prescriptions", response_model=PrescriptionRead, status_code=201,
             summary="Create a draft prescription")
async def create(
    data: PrescriptionCreate,
    doctor: User = Depends(require_role(UserRole.DOCTOR)),
):
    return await create_prescription(data, doctor)


@router.get("/prescriptions/{rx_id}", response_model=PrescriptionRead,
            summary="Get a prescription")
async def get_one(
    rx_id: str,
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.PHARMACY, UserRole.ADMIN)),
):
    return await get_prescription(rx_id)


@router.post("/prescriptions/{rx_id}/check", response_model=InteractionCheckResult,
             summary="Drug interaction check (OpenFDA)")
async def interaction_check(
    rx_id: str,
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    return await check_interactions(rx_id)


@router.post("/prescriptions/{rx_id}/sign", response_model=PrescriptionRead,
             summary="Sign prescription (locks + queues at pharmacy)")
async def sign(
    rx_id: str,
    doctor: User = Depends(require_role(UserRole.DOCTOR)),
):
    return await sign_prescription(rx_id, doctor)


# ── Pharmacy Dispense ─────────────────────────────────────────────────────────

@router.get("/prescriptions/queue", response_model=List[PrescriptionRead],
            summary="Pharmacy pending dispense queue")
async def pharmacy_queue(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    _: User = Depends(require_role(UserRole.PHARMACY, UserRole.ADMIN)),
):
    from src.models import Prescription, ConsultationStatus
    
    return await Prescription.find(
        Prescription.status == ConsultationStatus.SIGNED,
        Prescription.dispensed_at == None
    ).sort(+Prescription.signed_at).skip(skip).limit(limit).to_list()


@router.post("/prescriptions/{rx_id}/dispense", response_model=DispenseResult,
             summary="Dispense prescription (decrements stock, FEFO)")
async def dispense(
    rx_id: str,
    pharmacist: User = Depends(require_role(UserRole.PHARMACY)),
):
    return await dispense_prescription(rx_id, pharmacist)
