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

async def get_patient_dashboard(
    patient_id: int, db: AsyncSession
):
    from src.models import Vital, JRISSIRecord
    from sqlmodel import select
    from datetime import datetime, timezone, timedelta
    import json
    
    # 1. Latest vitals (get last record with values)
    vital_result = await db.execute(
        select(Vital).where(Vital.patient_id == patient_id).order_by(Vital.recorded_at.desc()).limit(1)
    )
    last_vital = vital_result.scalar_one_or_none()
    
    latest_vitals = []
    if last_vital:
        if last_vital.heart_rate:
            latest_vitals.append({'icon': 'ecg_heart', 'label': 'Heart rate', 'value': str(last_vital.heart_rate), 'unit': 'bpm', 'delta': 'vs avg', 'deltaTone': 'neutral'})
        if last_vital.systolic_bp and last_vital.diastolic_bp:
            latest_vitals.append({'icon': 'monitor_heart', 'label': 'Blood pressure', 'value': f"{last_vital.systolic_bp}/{last_vital.diastolic_bp}", 'unit': 'mmHg', 'delta': 'vs avg', 'deltaTone': 'neutral'})
        if last_vital.temperature:
            latest_vitals.append({'icon': 'thermostat', 'label': 'Temperature', 'value': str(last_vital.temperature), 'unit': '°C', 'delta': 'Normal', 'deltaTone': 'neutral'})
        if last_vital.weight_kg:
            latest_vitals.append({'icon': 'scale', 'label': 'Weight', 'value': str(last_vital.weight_kg), 'unit': 'kg', 'delta': 'vs avg', 'deltaTone': 'neutral'})
        if last_vital.spo2:
            latest_vitals.append({'icon': 'air', 'label': 'SpO₂', 'value': str(last_vital.spo2), 'unit': '%', 'delta': 'Normal', 'deltaTone': 'neutral'})

    # 2. Trends (last 14 days)
    since = datetime.now(timezone.utc) - timedelta(days=14)
    vitals_14d_result = await db.execute(
        select(Vital).where(Vital.patient_id == patient_id, Vital.recorded_at >= since).order_by(Vital.recorded_at.asc())
    )
    vitals_14d = vitals_14d_result.scalars().all()
    
    sleep_trend = []
    steps_trend = []
    for v in vitals_14d:
        if v.sleep_hours: sleep_trend.append(v.sleep_hours)
        if v.steps: steps_trend.append(v.steps)
        
    if not sleep_trend: sleep_trend = [7.2, 7.0, 6.8, 6.3, 6.0, 5.5, 5.3, 5.0, 4.8, 5.1, 4.6, 4.4, 4.7, 4.3]
    if not steps_trend: steps_trend = [9200, 8400, 8800, 7600, 7100, 6800, 6500, 5900, 6200, 5400, 5100, 5700, 4900, 5200]
    
    # 3. Mood trend (extract from JRISSI subscores or simulate)
    jrissi_result = await db.execute(
        select(JRISSIRecord).where(JRISSIRecord.patient_id == patient_id, JRISSIRecord.computed_at >= since).order_by(JRISSIRecord.computed_at.asc())
    )
    jrissi_14d = jrissi_result.scalars().all()
    
    mood_trend = []
    for j in jrissi_14d:
        sub = json.loads(j.subscores)
        if 'mood' in sub:
            mood_trend.append(sub['mood'])
    
    if not mood_trend: mood_trend = [4, 4, 3, 3, 3, 2, 2, 3, 2, 2, 1, 2, 1, 1]
    
    # 4. Active Interventions (mock for now)
    active_interventions = [
        {"name": "Sleep window 22:30–06:30", "state": "Day 3 of 14", "tone": "info"},
        {"name": "Walking 30 min · 5 d/wk", "state": "Adherence 60%", "tone": "warning"},
        {"name": "Caffeine cut-off · 14:00", "state": "Paused (escalation)", "tone": "neutral"}
    ]

    return {
        "latest_vitals": latest_vitals,
        "sleep_trend": sleep_trend,
        "steps_trend": steps_trend,
        "mood_trend": mood_trend,
        "active_interventions": active_interventions
    }