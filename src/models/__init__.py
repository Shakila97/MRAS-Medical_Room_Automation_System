"""
MRAS v3.0 — SQLModel Table Definitions
Each model maps to a PostgreSQL table. Add your models here.
"""

from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel

# User and UserRole live in their own module — import to expose them from the package
from src.models.user import User, UserRole  # noqa: F401


class Patient(SQLModel, table=True):
    __tablename__ = "patients"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    full_name: str
    date_of_birth: Optional[datetime] = None
    blood_type: Optional[str] = None
    allergies: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Consultation(SQLModel, table=True):
    __tablename__ = "consultations"

    id: Optional[int] = Field(default=None, primary_key=True)
    patient_id: int = Field(foreign_key="patients.id")
    doctor_id: int = Field(foreign_key="users.id")
    diagnosis: Optional[str] = None
    prescription: Optional[str] = None
    notes: Optional[str] = None
    visited_at: datetime = Field(default_factory=datetime.utcnow)


class InventoryItem(SQLModel, table=True):
    __tablename__ = "inventory"

    id: Optional[int] = Field(default=None, primary_key=True)
    drug_name: str
    quantity: int = Field(default=0)
    expiry_date: Optional[datetime] = None
    batch_number: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class JRISSIRecord(SQLModel, table=True):
    __tablename__ = "jrissi_records"

    id: Optional[int] = Field(default=None, primary_key=True)
    patient_id: int = Field(foreign_key="patients.id")
    mhrs: float
    risk_band: str
    sub_scores: Optional[str] = None  # JSON string
    computed_at: datetime = Field(default_factory=datetime.utcnow)
