"""MRAS — JRISSI Pydantic schemas"""
from beanie import PydanticObjectId
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel


class Subscore(BaseModel):
    key: str
    label: str
    value: float      # 0.0–1.0 normalised
    weight: float
    contribution: float


class Intervention(BaseModel):
    id: PydanticObjectId
    title: str
    description: str
    priority: str     # low | moderate | high


class JrissiReport(BaseModel):
    patient_id: PydanticObjectId
    current_score: int
    avg_7d: float
    avg_30d: float
    highest: int
    trend: List[int]
    subscores: List[Subscore]
    risk_band: str
    escalation_eligible: bool
    computed_at: datetime


class EscalationCreate(BaseModel):
    patient_id: PydanticObjectId
    reason: str


class EscalationRead(BaseModel):
    id: PydanticObjectId
    patient_id: PydanticObjectId
    notification_id: PydanticObjectId
    reason: str
    created_at: datetime

    model_config = {"from_attributes": True}


class JrissiOverviewItem(BaseModel):
    patient_id: PydanticObjectId
    employee_id: str
    full_name: str
    department: Optional[str] = None
    current_score: int
    risk_band: str
    trend: str          # up | down | stable
    last_computed: datetime
