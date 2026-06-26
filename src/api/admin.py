"""
MRAS v3.0 — Admin Router
User management, audit log, aggregate reports.
"""
from typing import List, Optional

from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select, func

from src.core.database import get_db
from src.models.user import User, UserRole
from src.models import AuditLog, Patient, Consultation, Prescription
from src.modules.auth_service import require_role, get_user_by_id
from src.modules.auth_service import hash_password
from src.core.security import hash_password
from src.schemas.admin import UserSummary, UserInvite, UserUpdate, AuditEntryRead, ReportSummary

router = APIRouter(prefix="/admin", tags=["Admin"])


# ── Users ─────────────────────────────────────────────────────────────────────

@router.get("/users", response_model=List[UserSummary], summary="List all users")
async def list_users(
    q: Optional[str] = Query(default=None),
    role: Optional[UserRole] = Query(default=None),
    active_only: bool = Query(default=True),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    stmt = select(User)
    if q:
        stmt = stmt.where(
            User.full_name.ilike(f"%{q}%") | User.email.ilike(f"%{q}%")
        )
    if role:
        stmt = stmt.where(User.role == role)
    if active_only:
        stmt = stmt.where(User.is_active == True)
    result = await db.execute(stmt.offset(skip).limit(limit))
    return result.scalars().all()


@router.post("/users", response_model=UserSummary, status_code=201,
             summary="Invite (create) a new user")
async def invite_user(
    data: UserInvite,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    # Check uniqueness
    result = await db.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Email already in use")
    user = User(
        email=data.email,
        full_name=data.full_name,
        employee_id=data.employee_id,
        role=data.role,
        hashed_password=hash_password("ChangeMe@123"),  # Temporary — user must change
        is_active=True,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user


@router.patch("/users/{user_id}", response_model=UserSummary, summary="Update user")
async def update_user(
    user_id: int,
    data: UserUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    user = await get_user_by_id(user_id, db)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
    db.add(user)
    return user


@router.post("/users/{user_id}/suspend", response_model=UserSummary,
             summary="Suspend a user account")
async def suspend_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_role(UserRole.ADMIN)),
):
    user = await get_user_by_id(user_id, db)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if user.id == admin.id:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Cannot suspend your own account")
    user.is_active = False
    db.add(user)
    db.add(AuditLog(
        actor_id=admin.id, actor_label=admin.email,
        action="user.suspend", target=f"user:{user_id}", level="warn",
    ))
    return user


# ── Audit Log ─────────────────────────────────────────────────────────────────

@router.get("/audit", response_model=List[AuditEntryRead], summary="View audit log")
async def audit_log(
    actor: Optional[str] = Query(default=None),
    action: Optional[str] = Query(default=None),
    level: Optional[str] = Query(default=None),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    stmt = select(AuditLog).order_by(AuditLog.created_at.desc())
    if actor:
        stmt = stmt.where(AuditLog.actor_label.ilike(f"%{actor}%"))
    if action:
        stmt = stmt.where(AuditLog.action.ilike(f"%{action}%"))
    if level:
        stmt = stmt.where(AuditLog.level == level)
    result = await db.execute(stmt.offset(skip).limit(limit))
    return result.scalars().all()


# ── Reports ───────────────────────────────────────────────────────────────────

@router.get("/reports/summary", response_model=ReportSummary, summary="Aggregate summary report")
async def summary_report(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    patient_count = (await db.execute(
        select(func.count(Patient.id)).where(Patient.is_active == True)
    )).scalar_one()
    consult_count = (await db.execute(select(func.count(Consultation.id)))).scalar_one()
    rx_count = (await db.execute(select(func.count(Prescription.id)))).scalar_one()

    from src.models import JRISSIRecord, RiskBand
    low = (await db.execute(
        select(func.count(JRISSIRecord.id)).where(JRISSIRecord.risk_band == RiskBand.LOW)
    )).scalar_one()
    moderate = (await db.execute(
        select(func.count(JRISSIRecord.id)).where(JRISSIRecord.risk_band == RiskBand.MODERATE)
    )).scalar_one()
    high = (await db.execute(
        select(func.count(JRISSIRecord.id)).where(JRISSIRecord.risk_band == RiskBand.HIGH)
    )).scalar_one()

    return ReportSummary(
        total_patients=patient_count,
        total_consultations=consult_count,
        total_prescriptions=rx_count,
        total_dispensed=0,
        jrissi_distribution={"low": low, "moderate": moderate, "high": high},
        top_conditions=[],
        range="all-time",
    )
