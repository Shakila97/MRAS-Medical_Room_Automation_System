"""
MRAS v3.0 — Admin Router
User management, audit log, aggregate reports.
"""
from typing import List, Optional
import re

from fastapi import APIRouter, Depends, Query, HTTPException, status
from beanie import PydanticObjectId

from src.models.user import User, UserRole
from src.models import AuditLog, Patient, Consultation, Prescription
from src.modules.auth_service import require_role, get_user_by_id
from src.modules.auth_service import hash_password
from src.schemas.admin import UserSummary, UserInvite, UserUpdate, AuditEntryRead, ReportSummary, UserStats

router = APIRouter(prefix="/admin", tags=["Admin"])


# ── Users ─────────────────────────────────────────────────────────────────────

@router.get("/users/stats", response_model=UserStats, summary="Get user role statistics")
async def get_user_stats(
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    users = await User.find(projection_model=User).to_list()
    
    stats = {
        "doctor": {"active": 0, "suspended": 0},
        "pharmacy": {"active": 0, "suspended": 0},
        "employee": {"active": 0, "suspended": 0},
        "admin": {"active": 0, "suspended": 0},
    }
    
    for u in users:
        r = u.role.value if hasattr(u.role, 'value') else u.role
        if r in stats:
            if u.is_active:
                stats[r]["active"] += 1
            else:
                stats[r]["suspended"] += 1
                
    def make_stat(role, active_suffix, suspended_suffix="suspended"):
        total = stats[role]["active"] + stats[role]["suspended"]
        if stats[role]["suspended"] > 0:
            sub = f"{stats[role]['suspended']} {suspended_suffix}"
        else:
            sub = active_suffix
        return {"total": total, "subtitle": sub}
        
    return {
        "doctors": make_stat("doctor", "All active", "pending"),
        "pharmacy": make_stat("pharmacy", "All active"),
        "employees": make_stat("employee", "All active"),
        "admins": {"total": stats["admin"]["active"] + stats["admin"]["suspended"], "subtitle": "SSO active"}
    }

@router.get("/users", response_model=List[UserSummary], summary="List all users")
async def list_users(
    q: Optional[str] = Query(default=None),
    role: Optional[UserRole] = Query(default=None),
    active_only: bool = Query(default=True),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    query = User.find()
    if q:
        regex = re.compile(q, re.IGNORECASE)
        query = query.find({"$or": [{"full_name": regex}, {"email": regex}]})
    if role:
        query = query.find(User.role == role)
    if active_only:
        query = query.find(User.is_active == True)
        
    users = await query.skip(skip).limit(limit).to_list()
    return users


@router.post("/users", response_model=UserSummary, status_code=201,
             summary="Invite (create) a new user")
async def invite_user(
    data: UserInvite,
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    # Check uniqueness
    existing = await User.find_one(User.email == data.email)
    if existing:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Email already in use")
        
    user = User(
        email=data.email,
        full_name=data.full_name,
        employee_id=data.employee_id,
        role=data.role,
        hashed_password=hash_password("ChangeMe@123"),  # Temporary — user must change
        is_active=True,
    )
    await user.insert()
    return user


@router.patch("/users/{user_id}", response_model=UserSummary, summary="Update user")
async def update_user(
    user_id: str,
    data: UserUpdate,
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
    await user.save()
    return user


@router.post("/users/{user_id}/suspend", response_model=UserSummary,
             summary="Suspend a user account")
async def suspend_user(
    user_id: str,
    admin: User = Depends(require_role(UserRole.ADMIN)),
):
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if str(user.id) == str(admin.id):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Cannot suspend your own account")
    user.is_active = False
    await user.save()
    
    await AuditLog(
        actor_id=admin.id, actor_label=admin.email,
        action="user.suspend", target=f"user:{user_id}", level="warn",
    ).insert()
    return user


# ── Audit Log ─────────────────────────────────────────────────────────────────

@router.get("/audit", response_model=List[AuditEntryRead], summary="View audit log")
async def audit_log(
    actor: Optional[str] = Query(default=None),
    action: Optional[str] = Query(default=None),
    level: Optional[str] = Query(default=None),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=500),
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    query = AuditLog.find()
    if actor:
        query = query.find({"actor_label": re.compile(actor, re.IGNORECASE)})
    if action:
        query = query.find({"action": re.compile(action, re.IGNORECASE)})
    if level:
        query = query.find(AuditLog.level == level)
        
    return await query.sort(-AuditLog.created_at).skip(skip).limit(limit).to_list()


# ── Reports ───────────────────────────────────────────────────────────────────

@router.get("/reports/summary", response_model=ReportSummary, summary="Aggregate summary report")
async def summary_report(
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    patient_count = await Patient.find(Patient.is_active == True).count()
    consult_count = await Consultation.find().count()
    rx_count = await Prescription.find().count()

    from src.models import JRISSIRecord, RiskBand
    low = await JRISSIRecord.find(JRISSIRecord.risk_band == RiskBand.LOW).count()
    moderate = await JRISSIRecord.find(JRISSIRecord.risk_band == RiskBand.MODERATE).count()
    high = await JRISSIRecord.find(JRISSIRecord.risk_band == RiskBand.HIGH).count()

    return ReportSummary(
        total_patients=patient_count,
        total_consultations=consult_count,
        total_prescriptions=rx_count,
        total_dispensed=0,
        jrissi_distribution={"low": low, "moderate": moderate, "high": high},
        top_conditions=[],
        range="all-time",
    )
