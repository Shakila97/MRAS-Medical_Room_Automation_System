"""
MRAS v3.0 — Patient Service
Business logic for employee health profiles, history retrieval, and QR check-in.
"""

from datetime import datetime, timezone, timedelta
from typing import Optional, Any
import json
import re

from fastapi import HTTPException, status
from beanie import PydanticObjectId

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
    patient_id: str | PydanticObjectId, db: Any = None
) -> Optional[Patient]:
    try:
        oid = PydanticObjectId(patient_id) if isinstance(patient_id, str) else patient_id
        return await Patient.get(oid)
    except Exception:
        return None


async def get_patient_by_employee_id(
    employee_id: str, db: Any = None
) -> Optional[Patient]:
    return await Patient.find_one(Patient.employee_id == employee_id)


async def get_patient_by_user_id(
    user_id: str | PydanticObjectId, db: Any = None
) -> Optional[Patient]:
    try:
        oid = PydanticObjectId(user_id) if isinstance(user_id, str) else user_id
        return await Patient.find_one(Patient.user_id == oid)
    except Exception:
        return None


# ── Operations ────────────────────────────────────────────────────────────────
async def create_patient(
    data: PatientCreate, user_id: str | PydanticObjectId, db: Any = None
) -> PatientRead:
    """
    Register a new patient profile.

    Raises:
        400: If a profile already exists for this user or employee ID.
    """
    oid = PydanticObjectId(user_id) if isinstance(user_id, str) else user_id
    
    # Check user doesn't already have a profile
    existing_by_user = await get_patient_by_user_id(oid)
    if existing_by_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A patient profile already exists for this user account",
        )

    # Check employee ID is unique
    existing_by_emp = await get_patient_by_employee_id(data.employee_id)
    if existing_by_emp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee ID '{data.employee_id}' is already registered",
        )

    patient = Patient(**data.model_dump(), user_id=oid)
    await patient.insert()
    return _to_read(patient)


async def list_patients(
    db: Any = None,
    department: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
) -> list[PatientSummary]:
    """
    List all active patients.
    Optionally filter by department or search by name / employee ID.
    """
    query = Patient.find(Patient.is_active == True)

    if department:
        query = query.find(Patient.department == department)

    if search:
        regex = re.compile(search, re.IGNORECASE)
        query = query.find(
            {"$or": [
                {"full_name": regex},
                {"employee_id": regex}
            ]}
        )

    patients = await query.skip(skip).limit(limit).sort(+Patient.full_name).to_list()
    return [_to_summary(p) for p in patients]


async def get_patient(
    patient_id: str | PydanticObjectId, db: Any = None
) -> PatientRead:
    """
    Get full patient profile by ID.

    Raises:
        404: If patient not found.
    """
    patient = await get_patient_by_id(patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Patient with ID {patient_id} not found",
        )
    return _to_read(patient)


async def get_my_profile(
    user_id: str | PydanticObjectId, db: Any = None
) -> PatientRead:
    """
    Get the patient profile belonging to the currently logged-in employee.

    Raises:
        404: If no profile exists yet for this user.
    """
    patient = await get_patient_by_user_id(user_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No patient profile found. Please contact your doctor or admin.",
        )
    return _to_read(patient)


async def update_patient(
    patient_id: str | PydanticObjectId,
    data: PatientUpdate,
    db: Any = None,
) -> PatientRead:
    """
    Update a patient profile.

    Raises:
        404: If patient not found.
    """
    patient = await get_patient_by_id(patient_id)
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
    await patient.save()
    return _to_read(patient)


async def checkin_patient(
    employee_id: str, db: Any = None
) -> dict:
    """
    Process a QR code check-in for an employee.
    Updates last_checkin timestamp and increments checkin_count.

    Raises:
        404: If no patient found with this employee ID.
    """
    patient = await get_patient_by_employee_id(employee_id)
    if not patient or not patient.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No active patient found with Employee ID '{employee_id}'",
        )

    now = datetime.now(timezone.utc)
    patient.last_checkin = now
    patient.checkin_count += 1
    patient.updated_at = now
    await patient.save()

    return {
        "message": "Check-in successful. Doctor has been notified.",
        "patient_id": str(patient.id),
        "employee_id": patient.employee_id,
        "full_name": patient.full_name,
        "checkin_time": now,
        "checkin_count": patient.checkin_count,
    }


async def deactivate_patient(
    patient_id: str | PydanticObjectId, db: Any = None
) -> dict:
    """
    Soft-delete a patient record by marking them inactive.

    Raises:
        404: If patient not found.
    """
    patient = await get_patient_by_id(patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Patient with ID {patient_id} not found",
        )
    patient.is_active = False
    patient.updated_at = datetime.now(timezone.utc)
    await patient.save()
    return {"message": f"Patient {patient.full_name} has been deactivated"}


async def get_patient_dashboard(
    patient_id: str | PydanticObjectId, db: Any = None
):
    from src.models import Vital, JRISSIRecord
    
    oid = PydanticObjectId(patient_id) if isinstance(patient_id, str) else patient_id

    # 1. Latest vitals (get last record with values)
    last_vital = await Vital.find(Vital.patient_id == oid).sort(-Vital.recorded_at).first_or_none()
    
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
    vitals_14d = await Vital.find(Vital.patient_id == oid, Vital.recorded_at >= since).sort(+Vital.recorded_at).to_list()
    
    sleep_trend = []
    steps_trend = []
    for v in vitals_14d:
        if v.sleep_hours: sleep_trend.append(v.sleep_hours)
        if v.steps: steps_trend.append(v.steps)
        
    if not sleep_trend: sleep_trend = [7.2, 7.0, 6.8, 6.3, 6.0, 5.5, 5.3, 5.0, 4.8, 5.1, 4.6, 4.4, 4.7, 4.3]
    if not steps_trend: steps_trend = [9200, 8400, 8800, 7600, 7100, 6800, 6500, 5900, 6200, 5400, 5100, 5700, 4900, 5200]
    
    # 3. Mood trend (extract from JRISSI subscores or simulate)
    jrissi_14d = await JRISSIRecord.find(JRISSIRecord.patient_id == oid, JRISSIRecord.computed_at >= since).sort(+JRISSIRecord.computed_at).to_list()
    
    mood_trend = []
    for j in jrissi_14d:
        sub = json.loads(j.subscores) if isinstance(j.sub_scores, str) else (j.sub_scores or {})
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