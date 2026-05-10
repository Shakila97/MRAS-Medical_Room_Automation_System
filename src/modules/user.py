from datetime import datetime
from enum import Enum
from typing import Optional

from sqlmodel import Field, SQLModel


# ── Role Enum ────────────────────────────────────────────────────────────────
class UserRole(str, Enum):
    """
    MRAS system roles.

    IMPORTANT: JRISSI mental health scores are accessible to DOCTOR only.
    ADMIN does not have PHI or JRISSI access — this is a hard privacy rule.
    """
    EMPLOYEE       = "employee"        # Own health profile, check-in, notifications
    DOCTOR         = "doctor"          # All patient records, JRISSI, briefings
    PHARMACY_STAFF = "pharmacy_staff"  # Inventory, FEFO, GRN only
    ADMIN          = "admin"           # System settings, users — no PHI


# ── User Table ───────────────────────────────────────────────────────────────
class User(SQLModel, table=True):
    """
    Core user record. Stores credentials and role assignment.
    Linked to Employee profile (patient_id) for clinical data access.
    """
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)

    # Identity
    email: str = Field(unique=True, index=True, max_length=255)
    full_name: str = Field(max_length=255)
    employee_id: Optional[str] = Field(
        default=None, unique=True, index=True, max_length=20,
        description="e.g. SIS/24/B2/36 — links to the Patient record"
    )

    # Auth
    hashed_password: str

    # Role-Based Access Control
    role: UserRole = Field(default=UserRole.EMPLOYEE)

    # Privacy & Consent
    sensor_consent: bool = Field(
        default=False,
        description="Employee must explicitly opt-in before any Stream 2 sensor data is collected"
    )

    # Status
    is_active: bool = Field(default=True)
    is_verified: bool = Field(default=False)

    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = Field(default=None)