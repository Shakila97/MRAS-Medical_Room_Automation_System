"""
MRAS v3.0 — Consultation Service
Handles SOAP consultation create, auto-save, and sign with audit trail.
"""
from datetime import datetime, timezone
from typing import List, Optional, Any

from fastapi import HTTPException, status
from beanie import PydanticObjectId

from src.models import Consultation, ConsultationStatus, Vital, AuditLog
from src.models.user import User
from src.schemas.consultation import ConsultationCreate, ConsultationUpdate


async def create_draft(data: ConsultationCreate, doctor: User, db: Any = None) -> Consultation:
    """Create a new draft consultation and optionally record vitals."""
    
    patient_oid = PydanticObjectId(data.patient_id) if isinstance(data.patient_id, str) else data.patient_id
    
    consult = Consultation(
        patient_id=patient_oid,
        doctor_id=doctor.id,
        status=ConsultationStatus.DRAFT,
    )
    await consult.insert()

    # Record vitals if provided
    if data.vitals:
        vital_data = {k: v for k, v in data.vitals.items() if k in Vital.model_fields}
        vital = Vital(
            patient_id=patient_oid,
            consultation_id=consult.id,
            **vital_data,
        )
        await vital.insert()

    await _audit(doctor, "consultation.create", f"consultation:{str(consult.id)}", f"patient:{str(patient_oid)}")
    return consult


async def save_draft(
    consult_id: str | PydanticObjectId,
    data: ConsultationUpdate,
    doctor: User,
    db: Any = None,
) -> Consultation:
    """Auto-save SOAP fields; only allowed while status is DRAFT."""
    consult = await _get_or_404(consult_id)
    if consult.status != ConsultationStatus.DRAFT:
        raise HTTPException(status.HTTP_409_CONFLICT,
                            "Cannot edit a signed consultation")

    update = data.model_dump(exclude_unset=True)
    for field, value in update.items():
        setattr(consult, field, value)
    consult.updated_at = datetime.now(timezone.utc)
    await consult.save()
    return consult


async def sign_consultation(
    consult_id: str | PydanticObjectId,
    doctor: User,
    db: Any = None,
) -> Consultation:
    """Lock a consultation (DRAFT → SIGNED) and write immutable audit entry."""
    consult = await _get_or_404(consult_id)
    if consult.doctor_id != doctor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Only the attending doctor can sign")
    if consult.status == ConsultationStatus.SIGNED:
        raise HTTPException(status.HTTP_409_CONFLICT, "Already signed")

    consult.status = ConsultationStatus.SIGNED
    consult.signed_at = datetime.now(timezone.utc)
    consult.updated_at = consult.signed_at
    await consult.save()

    await _audit(doctor, "consultation.sign",
                 f"consultation:{str(consult.id)}", f"patient:{str(consult.patient_id)}")
    return consult


async def get_consultation(consult_id: str | PydanticObjectId, db: Any = None) -> Consultation:
    return await _get_or_404(consult_id)


async def list_patient_consultations(
    patient_id: str | PydanticObjectId, db: Any = None, skip: int = 0, limit: int = 20
) -> List[Consultation]:
    oid = PydanticObjectId(patient_id) if isinstance(patient_id, str) else patient_id
    
    return await Consultation.find(Consultation.patient_id == oid)\
                             .sort(-Consultation.started_at)\
                             .skip(skip).limit(limit)\
                             .to_list()


async def get_vitals(consult_id: str | PydanticObjectId, db: Any = None) -> List[Vital]:
    oid = PydanticObjectId(consult_id) if isinstance(consult_id, str) else consult_id
    return await Vital.find(Vital.consultation_id == oid).to_list()


# ── Helpers ───────────────────────────────────────────────────────────────────
async def _get_or_404(consult_id: str | PydanticObjectId) -> Consultation:
    oid = PydanticObjectId(consult_id) if isinstance(consult_id, str) else consult_id
    consult = await Consultation.get(oid)
    if not consult:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Consultation not found")
    return consult


async def _audit(actor: User, action: str,
                 target: str, payload: Optional[str] = None) -> None:
    entry = AuditLog(
        actor_id=actor.id,
        actor_label=actor.email,
        action=action,
        target=target,
        payload=payload,
        level="info",
    )
    await entry.insert()
