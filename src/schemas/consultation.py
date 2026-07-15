"""MRAS — Consultation Pydantic schemas"""
from beanie import PydanticObjectId
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from src.models import ConsultationStatus


class SOAPFields(BaseModel):
    subjective: Optional[str] = None
    objective: Optional[str] = None
    assessment: Optional[str] = None
    plan: Optional[str] = None


class ConsultationCreate(BaseModel):
    patient_id: PydanticObjectId
    vitals: Optional[dict] = None


class ConsultationUpdate(SOAPFields):
    pass


class VitalRead(BaseModel):
    heart_rate: Optional[int] = None
    spo2: Optional[float] = None
    systolic_bp: Optional[int] = None
    diastolic_bp: Optional[int] = None
    temperature: Optional[float] = None
    weight_kg: Optional[float] = None
    steps: Optional[int] = None
    sleep_hours: Optional[float] = None
    recorded_at: datetime

    model_config = {"from_attributes": True}


class ConsultationRead(BaseModel):
    id: PydanticObjectId
    patient_id: PydanticObjectId
    doctor_id: PydanticObjectId
    subjective: Optional[str] = None
    objective: Optional[str] = None
    assessment: Optional[str] = None
    plan: Optional[str] = None
    jrissi_at_visit: Optional[int] = None
    status: ConsultationStatus
    started_at: datetime
    signed_at: Optional[datetime] = None
    updated_at: datetime

    model_config = {"from_attributes": True}


class MessageResponse(BaseModel):
    message: str
