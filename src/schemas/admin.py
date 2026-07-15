"""MRAS — Admin Pydantic schemas"""
from beanie import PydanticObjectId
from datetime import datetime
from typing import Optional, List, Any
from pydantic import BaseModel
from src.models import UserRole


class UserSummary(BaseModel):
    id: PydanticObjectId
    email: str
    full_name: str
    employee_id: Optional[str] = None
    role: UserRole
    is_active: bool
    last_login: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class UserInvite(BaseModel):
    email: str
    full_name: str
    employee_id: Optional[str] = None
    role: UserRole = UserRole.EMPLOYEE


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


class AuditEntryRead(BaseModel):
    id: PydanticObjectId
    actor_label: str
    action: str
    target: str
    ip_address: Optional[str] = None
    level: str
    payload: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}

class RoleStat(BaseModel):
    total: int
    subtitle: str

class UserStats(BaseModel):
    doctors: RoleStat
    pharmacy: RoleStat
    employees: RoleStat
    admins: RoleStat


class ReportSummary(BaseModel):
    total_patients: int
    total_consultations: int
    total_prescriptions: int
    total_dispensed: int
    jrissi_distribution: dict    # {"low": 45, "moderate": 30, "high": 10}
    top_conditions: List[dict]
    range: str


class Page(BaseModel):
    items: List[Any]
    total: int
    page: int
    page_size: int
    pages: int
