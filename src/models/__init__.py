"""
MRAS v3.0 — Beanie Document Definitions
All database collections for the full application.
"""

from datetime import datetime, date
from typing import Optional, List
from enum import Enum
import json

from beanie import Document, Indexed, PydanticObjectId
from pydantic import Field

# Re-export User and UserRole so all import paths work
from src.models.user import User, UserRole  # noqa: F401


# ── Enums ─────────────────────────────────────────────────────────────────────

class ConsultationStatus(str, Enum):
    DRAFT = "draft"
    SIGNED = "signed"
    AMENDED = "amended"


class RiskBand(str, Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"


class NotificationKind(str, Enum):
    JRISSI_ESCALATION = "jrissi_escalation"
    FORECAST_WATCH = "forecast_watch"
    STOCK_LOW = "stock_low"
    SYSTEM = "system"


class NotificationTone(str, Enum):
    INFO = "info"
    WARNING = "warning"
    DANGER = "danger"
    SUCCESS = "success"


class ForecastKind(str, Enum):
    POLLEN = "pollen"
    HEAT = "heat"
    AIR_QUALITY = "air_quality"
    FLU = "flu"
    OTHER = "other"


class AppointmentStatus(str, Enum):
    BOOKED = "booked"
    CHECKED_IN = "checked_in"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class GRNStatus(str, Enum):
    DRAFT = "draft"
    POSTED = "posted"


# ── Patient ────────────────────────────────────────────────────────────────────
from src.models.patient import Patient, BloodGroup, Gender, Department  # noqa: F401


# ── Vitals ─────────────────────────────────────────────────────────────────────

class Vital(Document):
    patient_id: Indexed(PydanticObjectId)
    consultation_id: Optional[PydanticObjectId] = None
    heart_rate: Optional[int] = None           # bpm
    spo2: Optional[float] = None               # %
    systolic_bp: Optional[int] = None          # mmHg
    diastolic_bp: Optional[int] = None         # mmHg
    temperature: Optional[float] = None        # °C
    weight_kg: Optional[float] = None
    steps: Optional[int] = None                # daily step count
    sleep_hours: Optional[float] = None
    source: str = Field(default="manual")      # manual | wearable | kiosk
    recorded_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "vitals"


# ── Consultation (SOAP) ────────────────────────────────────────────────────────

class Consultation(Document):
    patient_id: Indexed(PydanticObjectId)
    doctor_id: Indexed(PydanticObjectId)
    subjective: Optional[str] = None
    objective: Optional[str] = None
    assessment: Optional[str] = None
    plan: Optional[str] = None
    jrissi_at_visit: Optional[int] = None      # JRISSI score snapshot at time of visit
    status: ConsultationStatus = Field(default=ConsultationStatus.DRAFT)
    started_at: datetime = Field(default_factory=datetime.utcnow)
    signed_at: Optional[datetime] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "consultations"


# ── Drug Catalogue ─────────────────────────────────────────────────────────────

class Drug(Document):
    name: Indexed(str)
    generic_name: str
    atc_code: Optional[str] = None             # WHO ATC classification
    dosage_forms: Optional[str] = None         # JSON list: ["tablet", "syrup"]
    standard_dose: Optional[str] = None
    unit: Optional[str] = None                 # mg, ml, etc.
    is_controlled: bool = Field(default=False)
    is_active: bool = Field(default=True)
    
    class Settings:
        name = "drugs"


# ── Prescription ───────────────────────────────────────────────────────────────

class Prescription(Document):
    consultation_id: Indexed(PydanticObjectId)
    patient_id: Indexed(PydanticObjectId)
    doctor_id: PydanticObjectId
    status: ConsultationStatus = Field(default=ConsultationStatus.DRAFT)
    interaction_severity: Optional[str] = None  # none | low | moderate | high
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    signed_at: Optional[datetime] = None
    dispensed_at: Optional[datetime] = None
    
    class Settings:
        name = "prescriptions"


class PrescriptionLine(Document):
    prescription_id: Indexed(PydanticObjectId)
    drug_id: PydanticObjectId
    dose: str                                   # e.g. "500mg"
    frequency: str                              # e.g. "twice daily"
    duration_days: int
    instructions: Optional[str] = None
    quantity_dispensed: Optional[int] = None
    
    class Settings:
        name = "prescription_lines"


# ── Inventory ──────────────────────────────────────────────────────────────────

class InventoryItem(Document):
    drug_id: Indexed(PydanticObjectId)
    drug_name: str                              # denormalized for fast display
    total_quantity: int = Field(default=0)
    reorder_level: int = Field(default=50)
    unit: str = Field(default="tablets")
    location: Optional[str] = None             # shelf / bin
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "inventory"


class GRN(Document):
    po_number: Optional[str] = None
    supplier: Optional[str] = None
    received_by: PydanticObjectId
    status: GRNStatus = Field(default=GRNStatus.DRAFT)
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    posted_at: Optional[datetime] = None
    
    class Settings:
        name = "grns"


class GRNLot(Document):
    grn_id: Indexed(PydanticObjectId)
    drug_id: PydanticObjectId
    drug_name: str
    lot_no: str
    manufacturer: Optional[str] = None
    quantity: int
    expiry_date: date
    fefo_rank: int = Field(default=1)          # 1 = dispense first within SKU
    remaining_qty: int = Field(default=0)
    
    class Settings:
        name = "grn_lots"


# ── JRISSI ─────────────────────────────────────────────────────────────────────

class JRISSIRecord(Document):
    patient_id: Indexed(PydanticObjectId)
    mhrs: int                                  # 0-100 composite score
    risk_band: RiskBand
    sub_scores: Optional[str] = None           # JSON: {mental_history, sleep, exercise, ...}
    computed_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "jrissi_records"


# ── Appointments ───────────────────────────────────────────────────────────────

class Appointment(Document):
    patient_id: Indexed(PydanticObjectId)
    doctor_id: PydanticObjectId
    scheduled_at: datetime
    duration_minutes: int = Field(default=15)
    status: AppointmentStatus = Field(default=AppointmentStatus.BOOKED)
    qr_token: Optional[str] = None             # short-lived JWT for kiosk check-in
    qr_expires_at: Optional[datetime] = None
    checked_in_at: Optional[datetime] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "appointments"


# ── Notifications ──────────────────────────────────────────────────────────────

class Notification(Document):
    kind: NotificationKind
    tone: NotificationTone = Field(default=NotificationTone.INFO)
    title: str
    body: str
    target_role: str                            # JSON list of roles
    stage: str = Field(default="created")
    stages: str = Field(default='["created","acknowledged","resolved"]')  # JSON
    stage_index: int = Field(default=0)
    cta_label: Optional[str] = None
    cta_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    acked_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    acked_by: Optional[PydanticObjectId] = None
    
    class Settings:
        name = "notifications"


# ── Forecast Signals ───────────────────────────────────────────────────────────

class ForecastSignal(Document):
    kind: ForecastKind
    risk: RiskBand
    peak_day: date
    peak_label: str
    series: str                                 # JSON list[float]
    confidence: float = Field(default=0.0)
    affected_employees: str = Field(default="[]")    # JSON list of employee IDs
    related_conditions: str = Field(default="[]")    # JSON list of condition names
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    horizon_days: int = Field(default=14)
    
    class Settings:
        name = "forecast_signals"


# ── Audit Log ──────────────────────────────────────────────────────────────────

class AuditLog(Document):
    actor_id: Optional[PydanticObjectId] = None
    actor_label: str                            # "system" | user.email
    action: str                                 # "prescription.sign" | "jrissi.escalate"
    target: str                                 # "prescription:42" | "patient:7"
    ip_address: Optional[str] = None
    level: str = Field(default="info")          # info | warn | error
    payload: Optional[str] = None              # JSON blob
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "audit_logs"
