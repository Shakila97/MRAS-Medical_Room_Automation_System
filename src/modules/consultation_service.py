"""
MRAS v3.0 — Consultation Service
Handles SOAP consultation create, auto-save, and sign with audit trail.
"""
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.models import Consultation, ConsultationStatus, Vital, AuditLog
from src.models.user import User
from src.schemas.consultation import ConsultationCreate, ConsultationUpdate, ConsultationRead


async def create_draft(data: ConsultationCreate, doctor: User, db: AsyncSession) -> Consultation:
    """Create a new draft consultation and optionally record vitals."""
    consult = Consultation(
        patient_id=data.patient_id,
        doctor_id=doctor.id,
        status=ConsultationStatus.DRAFT,
    )
    db.add(consult)
    await db.flush()
    await db.refresh(consult)

    # Record vitals if provided
    if data.vitals:
        vital = Vital(
            patient_id=data.patient_id,
            consultation_id=consult.id,
            **{k: v for k, v in data.vitals.items()
               if k in Vital.model_fields},
        )
        db.add(vital)

    await _audit(db, doctor, "consultation.create",
                 f"consultation:{consult.id}", f"patient:{data.patient_id}")
    return consult


async def save_draft(
    consult_id: int,
    data: ConsultationUpdate,
    doctor: User,
    db: AsyncSession,
) -> Consultation:
    """Auto-save SOAP fields; only allowed while status is DRAFT."""
    consult = await _get_or_404(consult_id, db)
    if consult.status != ConsultationStatus.DRAFT:
        raise HTTPException(status.HTTP_409_CONFLICT,
                            "Cannot edit a signed consultation")

    update = data.model_dump(exclude_unset=True)
    for field, value in update.items():
        setattr(consult, field, value)
    consult.updated_at = datetime.now(timezone.utc)
    db.add(consult)
    return consult


async def sign_consultation(
    consult_id: int,
    doctor: User,
    db: AsyncSession,
) -> Consultation:
    """Lock a consultation (DRAFT → SIGNED) and write immutable audit entry."""
    consult = await _get_or_404(consult_id, db)
    if consult.doctor_id != doctor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Only the attending doctor can sign")
    if consult.status == ConsultationStatus.SIGNED:
        raise HTTPException(status.HTTP_409_CONFLICT, "Already signed")

    consult.status = ConsultationStatus.SIGNED
    consult.signed_at = datetime.now(timezone.utc)
    consult.updated_at = consult.signed_at
    db.add(consult)

    await _audit(db, doctor, "consultation.sign",
                 f"consultation:{consult_id}", f"patient:{consult.patient_id}")
    return consult


async def get_consultation(consult_id: int, db: AsyncSession) -> Consultation:
    return await _get_or_404(consult_id, db)


async def list_patient_consultations(
    patient_id: int, db: AsyncSession, skip: int = 0, limit: int = 20
) -> List[Consultation]:
    result = await db.execute(
        select(Consultation)
        .where(Consultation.patient_id == patient_id)
        .order_by(Consultation.started_at.desc())
        .offset(skip).limit(limit)
    )
    return result.scalars().all()


async def get_vitals(consult_id: int, db: AsyncSession) -> List[Vital]:
    result = await db.execute(
        select(Vital).where(Vital.consultation_id == consult_id)
    )
    return result.scalars().all()


# ── Helpers ───────────────────────────────────────────────────────────────────
async def _get_or_404(consult_id: int, db: AsyncSession) -> Consultation:
    result = await db.execute(select(Consultation).where(Consultation.id == consult_id))
    consult = result.scalar_one_or_none()
    if not consult:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Consultation not found")
    return consult


async def _audit(db: AsyncSession, actor: User, action: str,
                 target: str, payload: Optional[str] = None) -> None:
    entry = AuditLog(
        actor_id=actor.id,
        actor_label=actor.email,
        action=action,
        target=target,
        payload=payload,
        level="info",
    )
    db.add(entry)
