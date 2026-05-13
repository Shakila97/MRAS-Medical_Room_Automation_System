"""
MRAS v3.0 — Patient Service
Business logic for employee health profiles, history retrieval, and QR check-in.
"""

from datetime import datetime, timezone
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.models.patient import Patient
from src.models.user import User, UserRole
from src.schemas.patient import PatientCreate, PatientRead, PatientSummary, PatientUpdate


# ── Helpers ───────────────────────────────────────────────────────────────────
def _to_read(patient: Patient) -> PatientRead:
    """Convert Patient model to PatientRead schema including computed fields."""
    data = PatientRead.model_validate(patient)
    data.age = patient.age
    data.bmi = patient.bmi
    return data


def _to_summary(patient: Patient) -> PatientSummary:
    """Convert Patient model to PatientSummary schema."""
    data = PatientSummary.model_validate(patient)
    data.age = patient.age
    return data


# ── Queries ───────────────────────────────────────────────────────────────────
async def get_patient_by_id(
    patient_id: int, db: AsyncSession
) -> Optional[Patient]:
    result = await db.execute(
        select(Patient).where(Patient.id == patient_id)
    )
    return result.scalar_one_or_none()


async def get_patient_by_employee_id(
    employee_id: str, db: AsyncSession
) -> Optional[Patient]:
    result = await db.execute(
        select(Patient).where(Patient.employee_id == employee_id)
    )
    return result.scalar_one_or_none()


async def get_patient_by_user_id(
    user_id: int, db: AsyncSession
) -> Optional[Patient]:
    result = await db.execute(
        select(Patient).where(Patient.user_id == user_id)
    )
    return result.scalar_one_or_none()


# ── Operations ────────────────────────────────────────────────────────────────
async def create_patient(
    data: PatientCreate, user_id: int, db: AsyncSession
) -> PatientRead:
    """
    Register a new patient profile.

    Raises:
        400: If a profile already exists for this user or employee ID.
    """
    # Check user doesn't already have a profile
    existing_by_user = await get_patient_by_user_id(user_id, db)
    if existing_by_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A patient profile already exists for this user account",
        )

    # Check employee ID is unique
    existing_by_emp = await get_patient_by_employee_id(data.employee_id, db)
    if existing_by_emp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee ID '{data.employee_id}' is already registered",
        )

    patient = Patient(**data.model_dump(), user_id=user_id)
    db.add(patient)
    await db.flush()
    await db.refresh(patient)
    return _to_read(patient)


async def list_patients(
    db: AsyncSession,
    department: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
) -> list[PatientSummary]:
    """
    List all active patients.
    Optionally filter by department or search by name / employee ID.
    """
    query = select(Patient).where(Patient.is_active == True)

    if department:
        query = query.where(Patient.department == department)

    if search:
        query = query.where(
            Patient.full_name.ilike(f"%{search}%") |
            Patient.employee_id.ilike(f"%{search}%")
        )

    query = query.offset(skip).limit(limit).order_by(Patient.full_name)
    result = await db.execute(query)
    patients = result.scalars().all()
    return [_to_summary(p) for p in patients]


async def get_patient(
    patient_id: int, db: AsyncSession
) -> PatientRead:
    """
    Get full patient profile by ID.

    Raises:
        404: If patient not found.
    """
    patient = await get_patient_by_id(patient_id, db)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Patient with ID {patient_id} not found",
        )
    return _to_read(patient)


async def get_my_profile(
    user_id: int, db: AsyncSession
) -> PatientRead:
    """
    Get the patient profile belonging to the currently logged-in employee.

    Raises:
        404: If no profile exists yet for this user.
    """
    patient = await get_patient_by_user_id(user_id, db)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No patient profile found. Please contact your doctor or admin.",
        )
    return _to_read(patient)


async def update_patient(
    patient_id: int,
    data: PatientUpdate,
    db: AsyncSession,
) -> PatientRead:
    """
    Update a patient profile.

    Raises:
        404: If patient not found.
    """
    patient = await get_patient_by_id(patient_id, db)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Patient with ID {patient_id} not found",
        )

    # Only update fields that were actually provided
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(patient, field, value)

    patient.updated_at = datetime.now(timezone.utc)
    db.add(patient)
    await db.flush()
    await db.refresh(patient)
    return _to_read(patient)


async def checkin_patient(
    employee_id: str, db: AsyncSession
) -> dict:
    """
    Process a QR code check-in for an employee.
    Updates last_checkin timestamp and increments checkin_count.

    Raises:
        404: If no patient found with this employee ID.
    """
    patient = await get_patient_by_employee_id(employee_id, db)
    if not patient or not patient.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No active patient found with Employee ID '{employee_id}'",
        )

    now = datetime.now(timezone.utc)
    patient.last_checkin = now
    patient.checkin_count += 1
    patient.updated_at = now
    db.add(patient)
    await db.flush()

    return {
        "message": "Check-in successful. Doctor has been notified.",
        "patient_id": patient.id,
        "employee_id": patient.employee_id,
        "full_name": patient.full_name,
        "checkin_time": now,
        "checkin_count": patient.checkin_count,
    }


async def deactivate_patient(
    patient_id: int, db: AsyncSession
) -> dict:
    """
    Soft-delete a patient record by marking them inactive.

    Raises:
        404: If patient not found.
    """
    patient = await get_patient_by_id(patient_id, db)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Patient with ID {patient_id} not found",
        )
    patient.is_active = False
    patient.updated_at = datetime.now(timezone.utc)
    db.add(patient)
    return {"message": f"Patient {patient.full_name} has been deactivated"}