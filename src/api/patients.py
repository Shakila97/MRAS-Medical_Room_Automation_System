"""
MRAS v3.0 — Patients Router
CRUD endpoints for employee health profiles, medical history, and QR check-in.
"""

from typing import Optional

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_db
from src.models.user import User, UserRole
from src.modules.auth_service import get_current_user, require_role
from src.modules.patient_service import (
    checkin_patient,
    create_patient,
    deactivate_patient,
    get_my_profile,
    get_patient,
    list_patients,
    update_patient,
)
from src.schemas.patient import (
    CheckInResponse,
    MessageResponse,
    PatientCreate,
    PatientRead,
    PatientSummary,
    PatientUpdate,
)

router = APIRouter(prefix="/patients", tags=["Patient Management"])


# ── POST /api/patients ────────────────────────────────────────────────────────
@router.post(
    "/",
    response_model=PatientRead,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new patient profile",
)
async def register_patient(
    data: PatientCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    """
    Create a new patient health profile.
    **Doctor or Admin only.**
    """
    return await create_patient(data, current_user.id, db)


# ── GET /api/patients ─────────────────────────────────────────────────────────
@router.get(
    "/",
    response_model=list[PatientSummary],
    summary="List all patients",
)
async def list_all_patients(
    department: Optional[str] = Query(default=None, description="Filter by department"),
    search: Optional[str] = Query(default=None, description="Search by name or employee ID"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    """
    Get a list of all active patients with optional filtering.
    **Doctor or Admin only.**
    """
    return await list_patients(db, department, search, skip, limit)


# ── GET /api/patients/me ──────────────────────────────────────────────────────
@router.get(
    "/me",
    response_model=PatientRead,
    summary="Get my own patient profile",
)
async def get_my_patient_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Employees can view their own health profile.
    **All authenticated users.**
    """
    return await get_my_profile(current_user.id, db)


# ── POST /api/patients/checkin ────────────────────────────────────────────────
@router.post(
    "/checkin",
    response_model=CheckInResponse,
    summary="QR code check-in",
)
async def qr_checkin(
    employee_id: str = Query(..., description="Employee ID from QR code scan"),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """
    Process a QR code check-in for an employee arriving at the medical room.
    Updates last check-in time and notifies the doctor.
    **All authenticated users.**
    """
    result = await checkin_patient(employee_id, db)
    return CheckInResponse(**result)


# ── GET /api/patients/{id} ────────────────────────────────────────────────────
@router.get(
    "/{patient_id}",
    response_model=PatientRead,
    summary="Get full patient profile",
)
async def get_patient_by_id(
    patient_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    """
    Get a patient's full health profile by ID.
    **Doctor or Admin only.**
    """
    return await get_patient(patient_id, db)


# ── PUT /api/patients/{id} ────────────────────────────────────────────────────
@router.put(
    "/{patient_id}",
    response_model=PatientRead,
    summary="Update patient profile",
)
async def update_patient_profile(
    patient_id: int,
    data: PatientUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    """
    Update a patient's health profile.
    **Doctor or Admin only.**
    """
    return await update_patient(patient_id, data, db)


# ── DELETE /api/patients/{id} ─────────────────────────────────────────────────
@router.delete(
    "/{patient_id}",
    response_model=MessageResponse,
    summary="Deactivate a patient record",
)
async def deactivate_patient_record(
    patient_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    """
    Soft-delete a patient record (marks as inactive, data is preserved).
    **Admin only.**
    """
    return await deactivate_patient(patient_id, db)