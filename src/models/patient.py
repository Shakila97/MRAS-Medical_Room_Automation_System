from datetime import datetime, date
from enum import Enum
from typing import Optional

from sqlmodel import Field, SQLModel, Relationship


# ── Enums ─────────────────────────────────────────────────────────────────────
class BloodGroup(str, Enum):
    A_POS  = "A+"
    A_NEG  = "A-"
    B_POS  = "B+"
    B_NEG  = "B-"
    AB_POS = "AB+"
    AB_NEG = "AB-"
    O_POS  = "O+"
    O_NEG  = "O-"


class Gender(str, Enum):
    MALE        = "male"
    FEMALE      = "female"
    OTHER       = "other"
    PREFER_NOT  = "prefer_not_to_say"


class Department(str, Enum):
    ENGINEERING    = "Engineering"
    FINANCE        = "Finance"
    HR             = "Human Resources"
    IT             = "IT"
    MANAGEMENT     = "Management"
    MARKETING      = "Marketing"
    OPERATIONS     = "Operations"
    SALES          = "Sales"
    SECURITY       = "Security"
    OTHER          = "Other"


# ── Patient Table ─────────────────────────────────────────────────────────────
class Patient(SQLModel, table=True):
    """
    Employee health profile.
    One Patient record per employee — linked to their User account via user_id.
    """
    __tablename__ = "patients"

    id: Optional[int] = Field(default=None, primary_key=True)

    # ── Link to User account ──────────────────────────────────────────────────
    user_id: int = Field(foreign_key="users.id", unique=True, index=True)

    # ── Identity ──────────────────────────────────────────────────────────────
    employee_id: str = Field(unique=True, index=True, max_length=20)
    full_name: str = Field(max_length=255)
    date_of_birth: date
    gender: Gender
    department: Department
    job_title: str = Field(max_length=255)

    # ── Contact ───────────────────────────────────────────────────────────────
    phone: str = Field(max_length=20)
    emergency_contact_name: str = Field(max_length=255)
    emergency_contact_phone: str = Field(max_length=20)

    # ── Medical Info ──────────────────────────────────────────────────────────
    blood_group: Optional[BloodGroup] = Field(default=None)
    height_cm: Optional[float] = Field(default=None)
    weight_kg: Optional[float] = Field(default=None)
    allergies: Optional[str] = Field(default=None, max_length=1000)
    chronic_conditions: Optional[str] = Field(default=None, max_length=1000)
    current_medications: Optional[str] = Field(default=None, max_length=1000)

    # ── Status ────────────────────────────────────────────────────────────────
    is_active: bool = Field(default=True)

    # ── Check-in ─────────────────────────────────────────────────────────────
    last_checkin: Optional[datetime] = Field(default=None)
    checkin_count: int = Field(default=0)

    # ── Timestamps ───────────────────────────────────────────────────────────
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @property
    def age(self) -> int:
        """Calculate patient age from date of birth."""
        today = date.today()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )

    @property
    def bmi(self) -> Optional[float]:
        """Calculate BMI if height and weight are available."""
        if self.height_cm and self.weight_kg:
            height_m = self.height_cm / 100
            return round(self.weight_kg / (height_m ** 2), 1)
        return None