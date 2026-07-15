"""MRAS — Prescription & Drug Pydantic schemas"""
from beanie import PydanticObjectId
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from src.models import ConsultationStatus


class DrugRead(BaseModel):
    id: PydanticObjectId
    name: str
    generic_name: str
    atc_code: Optional[str] = None
    dosage_forms: Optional[str] = None
    standard_dose: Optional[str] = None
    unit: Optional[str] = None
    is_controlled: bool

    model_config = {"from_attributes": True}


class PrescriptionLineCreate(BaseModel):
    drug_id: PydanticObjectId
    dose: str
    frequency: str
    duration_days: int
    instructions: Optional[str] = None


class PrescriptionLineRead(PrescriptionLineCreate):
    id: PydanticObjectId
    prescription_id: PydanticObjectId
    quantity_dispensed: Optional[int] = None

    model_config = {"from_attributes": True}


class PrescriptionCreate(BaseModel):
    consultation_id: PydanticObjectId
    patient_id: PydanticObjectId
    lines: List[PrescriptionLineCreate]
    notes: Optional[str] = None


class PrescriptionRead(BaseModel):
    id: PydanticObjectId
    consultation_id: PydanticObjectId
    patient_id: PydanticObjectId
    doctor_id: PydanticObjectId
    status: ConsultationStatus
    interaction_severity: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    signed_at: Optional[datetime] = None
    dispensed_at: Optional[datetime] = None
    lines: List[PrescriptionLineRead] = []

    model_config = {"from_attributes": True}


class Interaction(BaseModel):
    drug_a: str
    drug_b: str
    description: str
    severity: str


class AllergyHit(BaseModel):
    drug_name: str
    allergen: str


class InteractionCheckResult(BaseModel):
    interactions: List[Interaction] = []
    allergies: List[AllergyHit] = []
    duplicates: List[str] = []
    pregnancy_warnings: List[str] = []
    renal_warnings: List[str] = []
    severity: str = "none"   # none | low | moderate | high


class DispenseResult(BaseModel):
    prescription_id: PydanticObjectId
    status: str
    dispensed_at: datetime
    message: str
