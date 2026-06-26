"""
MRAS v3.0 — Prescription Service
Drug interaction checking via OpenFDA, prescription CRUD, pharmacy dispense.
"""
from datetime import datetime, timezone
from typing import List, Optional

import httpx
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.models import (
    Drug, Prescription, PrescriptionLine, InventoryItem, GRNLot,
    ConsultationStatus, Patient, AuditLog,
)
from src.models.user import User
from src.schemas.prescription import (
    PrescriptionCreate, InteractionCheckResult,
    Interaction, AllergyHit, DispenseResult,
)

OPENFDA_BASE = "https://api.fda.gov/drug/label.json"
SEVERITY_RANK = {"none": 0, "low": 1, "moderate": 2, "high": 3}


# ── Prescription CRUD ─────────────────────────────────────────────────────────

async def create_prescription(
    data: PrescriptionCreate, doctor: User, db: AsyncSession
) -> Prescription:
    rx = Prescription(
        consultation_id=data.consultation_id,
        patient_id=data.patient_id,
        doctor_id=doctor.id,
        status=ConsultationStatus.DRAFT,
        notes=data.notes,
    )
    db.add(rx)
    await db.flush()
    await db.refresh(rx)

    for line_data in data.lines:
        line = PrescriptionLine(prescription_id=rx.id, **line_data.model_dump())
        db.add(line)

    return rx


async def get_prescription(rx_id: int, db: AsyncSession) -> Prescription:
    result = await db.execute(select(Prescription).where(Prescription.id == rx_id))
    rx = result.scalar_one_or_none()
    if not rx:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Prescription not found")
    return rx


async def sign_prescription(rx_id: int, doctor: User, db: AsyncSession) -> Prescription:
    rx = await get_prescription(rx_id, db)
    if rx.doctor_id != doctor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Only the prescribing doctor can sign")
    if rx.status == ConsultationStatus.SIGNED:
        raise HTTPException(status.HTTP_409_CONFLICT, "Already signed")

    rx.status = ConsultationStatus.SIGNED
    rx.signed_at = datetime.now(timezone.utc)
    db.add(rx)

    # Audit
    audit = AuditLog(
        actor_id=doctor.id, actor_label=doctor.email,
        action="prescription.sign", target=f"prescription:{rx_id}",
        level="info",
    )
    db.add(audit)
    return rx


# ── Drug Interaction Check (OpenFDA) ─────────────────────────────────────────

async def check_interactions(
    rx_id: int,
    db: AsyncSession,
    patient: Optional[Patient] = None,
) -> InteractionCheckResult:
    """
    Check for drug interactions, allergy hits, and duplicates using OpenFDA.
    Falls back gracefully if the OpenFDA API is unavailable.
    """
    # Load the prescription and its lines
    result = await db.execute(
        select(PrescriptionLine).where(PrescriptionLine.prescription_id == rx_id)
    )
    lines = result.scalars().all()
    if not lines:
        return InteractionCheckResult(severity="none")

    # Get drug names
    drug_ids = [line.drug_id for line in lines]
    drug_result = await db.execute(select(Drug).where(Drug.id.in_(drug_ids)))
    drugs = {d.id: d for d in drug_result.scalars().all()}
    drug_names = [drugs[lid].name for lid in drug_ids if lid in drugs]

    interactions: List[Interaction] = []
    allergies: List[AllergyHit] = []
    duplicates: List[str] = []
    worst_severity = "none"

    # Check patient allergies against drugs
    if patient and patient.allergies:
        allergen_list = [a.strip().lower() for a in patient.allergies.split(",")]
        for drug in drugs.values():
            for allergen in allergen_list:
                if allergen and allergen in drug.name.lower():
                    allergies.append(AllergyHit(
                        drug_name=drug.name, allergen=allergen
                    ))
                    worst_severity = "high"

    # Check for duplicate ATC classes
    atc_codes = [d.atc_code for d in drugs.values() if d.atc_code]
    seen_atc = set()
    for code in atc_codes:
        prefix = code[:3]  # First 3 chars = ATC class
        if prefix in seen_atc:
            duplicates.append(f"Duplicate ATC class {prefix}")
            if SEVERITY_RANK.get(worst_severity, 0) < SEVERITY_RANK["moderate"]:
                worst_severity = "moderate"
        seen_atc.add(prefix)

    # OpenFDA drug interaction lookup
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            for i, name_a in enumerate(drug_names):
                for name_b in drug_names[i + 1:]:
                    resp = await client.get(
                        OPENFDA_BASE,
                        params={"search": f'drug_interactions:"{name_a}"', "limit": 1},
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        results = data.get("results", [])
                        if results:
                            di_text = results[0].get("drug_interactions", [""])[0]
                            if name_b.lower() in di_text.lower():
                                interactions.append(Interaction(
                                    drug_a=name_a, drug_b=name_b,
                                    description=di_text[:200],
                                    severity="moderate",
                                ))
                                if SEVERITY_RANK.get(worst_severity, 0) < SEVERITY_RANK["moderate"]:
                                    worst_severity = "moderate"
    except Exception:
        pass  # OpenFDA timeout — return what we have

    # Persist severity on prescription
    rx_result = await db.execute(select(Prescription).where(Prescription.id == rx_id))
    rx = rx_result.scalar_one_or_none()
    if rx:
        rx.interaction_severity = worst_severity
        db.add(rx)

    return InteractionCheckResult(
        interactions=interactions,
        allergies=allergies,
        duplicates=duplicates,
        severity=worst_severity,
    )


# ── Drug Search ───────────────────────────────────────────────────────────────

async def search_drugs(
    q: Optional[str], atc: Optional[str], db: AsyncSession,
    skip: int = 0, limit: int = 20,
) -> List[Drug]:
    stmt = select(Drug).where(Drug.is_active == True)
    if q:
        stmt = stmt.where(Drug.name.ilike(f"%{q}%") | Drug.generic_name.ilike(f"%{q}%"))
    if atc:
        stmt = stmt.where(Drug.atc_code.ilike(f"{atc}%"))
    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


# ── Pharmacy Dispense ─────────────────────────────────────────────────────────

async def dispense_prescription(
    rx_id: int, pharmacist: User, db: AsyncSession
) -> DispenseResult:
    """Dispense a signed prescription — decrements stock using FEFO order."""
    rx = await get_prescription(rx_id, db)
    if rx.status != ConsultationStatus.SIGNED:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Only signed prescriptions can be dispensed")
    if rx.dispensed_at:
        raise HTTPException(status.HTTP_409_CONFLICT, "Already dispensed")

    # Load lines
    lines_result = await db.execute(
        select(PrescriptionLine).where(PrescriptionLine.prescription_id == rx_id)
    )
    lines = lines_result.scalars().all()

    for line in lines:
        qty_needed = line.duration_days  # Simple: 1 unit per day
        # Deduct from FEFO-ranked lots
        lots_result = await db.execute(
            select(GRNLot)
            .where(GRNLot.drug_id == line.drug_id, GRNLot.remaining_qty > 0)
            .order_by(GRNLot.expiry_date.asc())  # FEFO
        )
        lots = lots_result.scalars().all()
        remaining = qty_needed
        for lot in lots:
            if remaining <= 0:
                break
            deduct = min(remaining, lot.remaining_qty)
            lot.remaining_qty -= deduct
            remaining -= deduct
            db.add(lot)

        # Update inventory total
        inv_result = await db.execute(
            select(InventoryItem).where(InventoryItem.drug_id == line.drug_id)
        )
        inv = inv_result.scalar_one_or_none()
        if inv:
            inv.total_quantity = max(0, inv.total_quantity - qty_needed)
            inv.updated_at = datetime.now(timezone.utc)
            db.add(inv)

        line.quantity_dispensed = qty_needed
        db.add(line)

    now = datetime.now(timezone.utc)
    rx.dispensed_at = now
    db.add(rx)

    # Audit
    audit = AuditLog(
        actor_id=pharmacist.id, actor_label=pharmacist.email,
        action="prescription.dispense", target=f"prescription:{rx_id}",
        level="info",
    )
    db.add(audit)

    return DispenseResult(
        prescription_id=rx_id,
        status="dispensed",
        dispensed_at=now,
        message="Prescription dispensed successfully",
    )
