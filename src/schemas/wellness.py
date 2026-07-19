"""MRAS — Wellness & Appointment Pydantic schemas"""
from beanie import PydanticObjectId
from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel


class VitalSubmit(BaseModel):
    heart_rate: Optional[int] = None
    spo2: Optional[float] = None
    temperature: Optional[float] = None
    weight_kg: Optional[float] = None
    steps: Optional[int] = None
    sleep_hours: Optional[float] = None
    mood: Optional[int] = None       # 1-5 self-reported mood score


class VitalRead(BaseModel):
    heart_rate: Optional[int] = None
    spo2: Optional[float] = None
    temperature: Optional[float] = None
    weight_kg: Optional[float] = None
    steps: Optional[int] = None
    sleep_hours: Optional[float] = None
    mood: Optional[int] = None
    source: str
    recorded_at: datetime


class Metric(BaseModel):
    key: str
    label: str
    value: float
    unit: str
    trend: str      # up | down | stable


class Goal(BaseModel):
    id: PydanticObjectId
    title: str
    progress: int   # 0-100
    target: str


class WellnessHome(BaseModel):
    score: int
    score_delta: int
    series: List[int]
    metrics: List[Metric]
    next_appointment: Optional[dict] = None


class ActivityItem(BaseModel):
    id: PydanticObjectId
    kind: str       # consultation | checkin | vital | appointment
    title: str
    description: str
    occurred_at: datetime


class SlotRead(BaseModel):
    start: datetime
    end: datetime
    doctor_id: PydanticObjectId
    doctor_name: str
    available: bool


class AppointmentCreate(BaseModel):
    doctor_id: PydanticObjectId
    scheduled_at: datetime
    duration_minutes: int = 15
    notes: Optional[str] = None


class AppointmentRead(BaseModel):
    id: PydanticObjectId
    patient_id: PydanticObjectId
    doctor_id: PydanticObjectId
    scheduled_at: datetime
    duration_minutes: int
    status: str
    qr_token: Optional[str] = None
    qr_expires_at: Optional[datetime] = None
    checked_in_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class CheckInRequest(BaseModel):
    qr_token: str


class CheckInResponse(BaseModel):
    session_token: str
    room: str
    doctor_name: str
    patient_name: str
    appointment_id: PydanticObjectId
