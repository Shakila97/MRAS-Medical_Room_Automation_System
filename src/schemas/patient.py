from datetime import datetime, date
from typing import Optional

from pydantic import BaseModel, field_validator

from src.models.patient import BloodGroup, Department, Gender


# ── Request Schemas ───────────────────────────────────────────────────────────
class PatientCreate(BaseModel):
    """Request body for registering a new patient profile."""
    employee_id: str
    full_name: str
    date_of_birth: date
    gender: Gender
    department: Department
    job_title: str
    phone: str
    emergency_contact_name: str
    emergency_contact_phone: str
    blood_group: Optional[BloodGroup] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    allergies: Optional[str] = None
    chronic_conditions: Optional[str] = None
    current_medications: Optional[str] = None

    @field_validator("date_of_birth")
    @classmethod
    def dob_must_be_in_past(cls, v: date) -> date:
        if v >= date.today():
            raise ValueError("Date of birth must be in the past")
        return v

    @field_validator("height_cm")
    @classmethod
    def height_must_be_valid(cls, v: Optional[float]) -> Optional[float]:
        if v is not None and not (50 <= v <= 300):
            raise ValueError("Height must be between 50 and 300 cm")
        return v

    @field_validator("weight_kg")
    @classmethod
    def weight_must_be_valid(cls, v: Optional[float]) -> Optional[float]:
        if v is not None and not (1 <= v <= 500):
            raise ValueError("Weight must be between 1 and 500 kg")
        return v


class PatientUpdate(BaseModel):
    """Request body for updating a patient profile — all fields optional."""
    full_name: Optional[str] = None
    department: Optional[Department] = None
    job_title: Optional[str] = None
    phone: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    blood_group: Optional[BloodGroup] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    allergies: Optional[str] = None
    chronic_conditions: Optional[str] = None
    current_medications: Optional[str] = None


# ── Response Schemas ──────────────────────────────────────────────────────────
class PatientRead(BaseModel):
    """Full patient profile response — for doctors."""
    id: int
    user_id: int
    employee_id: str
    full_name: str
    date_of_birth: date
    gender: Gender
    department: Department
    job_title: str
    phone: str
    emergency_contact_name: str
    emergency_contact_phone: str
    blood_group: Optional[BloodGroup]
    height_cm: Optional[float]
    weight_kg: Optional[float]
    allergies: Optional[str]
    chronic_conditions: Optional[str]
    current_medications: Optional[str]
    is_active: bool
    last_checkin: Optional[datetime]
    checkin_count: int
    created_at: datetime
    updated_at: datetime

    # Computed fields
    age: Optional[int] = None
    bmi: Optional[float] = None

    model_config = {"from_attributes": True}


class PatientSummary(BaseModel):
    """Short patient card — for listing and search results."""
    id: int
    employee_id: str
    full_name: str
    department: Department
    job_title: str
    blood_group: Optional[BloodGroup]
    age: Optional[int] = None
    last_checkin: Optional[datetime]
    is_active: bool

    model_config = {"from_attributes": True}


class CheckInResponse(BaseModel):
    """Response after a successful QR check-in."""
    message: str
    patient_id: int
    employee_id: str
    full_name: str
    checkin_time: datetime
    checkin_count: int


class MessageResponse(BaseModel):
    message: str