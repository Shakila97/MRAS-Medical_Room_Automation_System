"""
MRAS v3.0 — Pydantic Request / Response Schemas
Separated from DB models to allow independent versioning.
"""

from beanie import PydanticObjectId
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ---------------------------------------------------------------------------
# Patient
# ---------------------------------------------------------------------------

class PatientCreate(BaseModel):
    full_name: str
    date_of_birth: Optional[datetime] = None
    blood_type: Optional[str] = None
    allergies: Optional[str] = None


class PatientRead(PatientCreate):
    id: PydanticObjectId
    user_id: PydanticObjectId
    created_at: datetime


# ---------------------------------------------------------------------------
# Consultation
# ---------------------------------------------------------------------------

class ConsultationCreate(BaseModel):
    patient_id: PydanticObjectId
    diagnosis: Optional[str] = None
    prescription: Optional[str] = None
    notes: Optional[str] = None


class ConsultationRead(ConsultationCreate):
    id: PydanticObjectId
    doctor_id: PydanticObjectId
    visited_at: datetime


# ---------------------------------------------------------------------------
# Inventory
# ---------------------------------------------------------------------------

class InventoryItemCreate(BaseModel):
    drug_name: str
    quantity: int
    expiry_date: Optional[datetime] = None
    batch_number: Optional[str] = None


class InventoryItemRead(InventoryItemCreate):
    id: PydanticObjectId
    created_at: datetime


# ---------------------------------------------------------------------------
# Intelligence / JRISSI
# ---------------------------------------------------------------------------

class JRISSIResponse(BaseModel):
    mhrs: float
    risk_band: str
    sub_scores: dict


class ForecastResponse(BaseModel):
    episode_probability: float
    alert_triggered: bool
    forecast_horizon_days: int
    trend: str
