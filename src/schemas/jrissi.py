"""MRAS — JRISSI Pydantic schemas"""
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
    id: int
    title: str
    description: str
    priority: str     # low | moderate | high


class JrissiReport(BaseModel):
    patient_id: int
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
    patient_id: int
    reason: str


class EscalationRead(BaseModel):
    id: int
    patient_id: int
    notification_id: int
    reason: str
    created_at: datetime

    model_config = {"from_attributes": True}


class JrissiOverviewItem(BaseModel):
    patient_id: int
    employee_id: str
    full_name: str
    department: Optional[str] = None
    current_score: int
    risk_band: str
    trend: str          # up | down | stable
    last_computed: datetime
