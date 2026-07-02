from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from beanie import PydanticObjectId

from src.models.user import User, UserRole
from src.modules.auth_service import get_current_user, require_role
from src.modules.consultation_service import (
    create_draft, save_draft, sign_consultation,
    get_consultation, list_patient_consultations, get_vitals,
)
from src.schemas.consultation import (
    ConsultationCreate, ConsultationUpdate, ConsultationRead,
    VitalRead, MessageResponse,
)

router = APIRouter(prefix="/consultations", tags=["Consultations"])


@router.post("/", response_model=ConsultationRead, status_code=201,
             summary="Create a new draft consultation")
async def create(
    data: ConsultationCreate,
    doctor: User = Depends(require_role(UserRole.DOCTOR)),
):
    return await create_draft(data, doctor)


@router.get("/{consult_id}", response_model=ConsultationRead,
            summary="Get a consultation")
async def get_one(
    consult_id: str,
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    return await get_consultation(consult_id)


@router.patch("/{consult_id}", response_model=ConsultationRead,
              summary="Auto-save SOAP fields")
async def save(
    consult_id: str,
    data: ConsultationUpdate,
    doctor: User = Depends(require_role(UserRole.DOCTOR)),
):
    return await save_draft(consult_id, data, doctor)


@router.post("/{consult_id}/sign", response_model=ConsultationRead,
             summary="Sign and lock a consultation")
async def sign(
    consult_id: str,
    doctor: User = Depends(require_role(UserRole.DOCTOR)),
):
    return await sign_consultation(consult_id, doctor)


@router.get("/{consult_id}/vitals", response_model=List[VitalRead],
            summary="Get vitals recorded during this consultation")
async def vitals(
    consult_id: str,
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    return await get_vitals(consult_id)


@router.get("/patient/{patient_id}", response_model=List[ConsultationRead],
            summary="List all consultations for a patient")
async def list_for_patient(
    patient_id: str,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    if patient_id.startswith("E-") or not PydanticObjectId.is_valid(patient_id):
        from src.modules.patient_service import get_patient_by_employee_id
        patient = await get_patient_by_employee_id(patient_id)
        if not patient:
            from fastapi import HTTPException
            raise HTTPException(404, "Patient not found")
        patient_oid = patient.id
    else:
        patient_oid = patient_id
        
    return await list_patient_consultations(patient_oid, skip=skip, limit=limit)
