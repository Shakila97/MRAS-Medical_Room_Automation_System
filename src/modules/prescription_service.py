"""
MRAS v3.0 — Prescription Service
Drug interaction checking via OpenFDA, prescription CRUD, pharmacy dispense.
"""
from datetime import datetime, timezone
from typing import List, Optional, Any
import re

import httpx
from fastapi import HTTPException, status
from beanie import PydanticObjectId

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
    data: PrescriptionCreate, doctor: User, db: Any = None
) -> Prescription:
    patient_oid = PydanticObjectId(data.patient_id) if isinstance(data.patient_id, str) else data.patient_id
    consultation_oid = PydanticObjectId(data.consultation_id) if isinstance(data.consultation_id, str) else data.consultation_id
    
    rx = Prescription(
        consultation_id=consultation_oid,
        patient_id=patient_oid,
        doctor_id=doctor.id,
        status=ConsultationStatus.DRAFT,
        notes=data.notes,
    )
    await rx.insert()

    for line_data in data.lines:
        line = PrescriptionLine(prescription_id=rx.id, **line_data.model_dump())
        await line.insert()

    return rx


async def get_prescription(rx_id: str | PydanticObjectId, db: Any = None) -> Prescription:
    oid = PydanticObjectId(rx_id) if isinstance(rx_id, str) else rx_id
    rx = await Prescription.get(oid)
    if not rx:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Prescription not found")
    return rx


async def sign_prescription(rx_id: str | PydanticObjectId, doctor: User, db: Any = None) -> Prescription:
    rx = await get_prescription(rx_id)
    if rx.doctor_id != doctor.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Only the prescribing doctor can sign")
    if rx.status == ConsultationStatus.SIGNED:
        raise HTTPException(status.HTTP_409_CONFLICT, "Already signed")

    rx.status = ConsultationStatus.SIGNED
    rx.signed_at = datetime.now(timezone.utc)
    await rx.save()

    # Audit
    await AuditLog(
        actor_id=doctor.id, actor_label=doctor.email,
        action="prescription.sign", target=f"prescription:{str(rx_id)}",
        level="info",
    ).insert()
    return rx


# ── Drug Interaction Check (OpenFDA) ─────────────────────────────────────────

async def check_interactions(
    rx_id: str | PydanticObjectId,
    db: Any = None,
    patient: Optional[Patient] = None,
) -> InteractionCheckResult:
    """
    Check for drug interactions, allergy hits, and duplicates using OpenFDA.
    Falls back gracefully if the OpenFDA API is unavailable.
    """
    oid = PydanticObjectId(rx_id) if isinstance(rx_id, str) else rx_id
    
    # Load the prescription and its lines
    lines = await PrescriptionLine.find(PrescriptionLine.prescription_id == oid).to_list()
    if not lines:
        return InteractionCheckResult(severity="none")

    # Get drug names
    drug_ids = [line.drug_id for line in lines]
    drugs = {}
    for lid in drug_ids:
        d = await Drug.get(lid)
        if d:
            drugs[lid] = d
            
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
    rx = await Prescription.get(oid)
    if rx:
        rx.interaction_severity = worst_severity
        await rx.save()

    return InteractionCheckResult(
        interactions=interactions,
        allergies=allergies,
        duplicates=duplicates,
        severity=worst_severity,
    )


# ── Drug Search ───────────────────────────────────────────────────────────────

async def search_drugs(
    q: Optional[str], atc: Optional[str], db: Any = None,
    skip: int = 0, limit: int = 20,
) -> List[Drug]:
    query = Drug.find(Drug.is_active == True)
    
    if q:
        regex = re.compile(q, re.IGNORECASE)
        query = query.find({"$or": [{"name": regex}, {"generic_name": regex}]})
    if atc:
        regex = re.compile(f"^{atc}", re.IGNORECASE)
        query = query.find({"atc_code": regex})
        
    return await query.skip(skip).limit(limit).to_list()


# ── Pharmacy Dispense ─────────────────────────────────────────────────────────

async def dispense_prescription(
    rx_id: str | PydanticObjectId, pharmacist: User, db: Any = None
) -> DispenseResult:
    """Dispense a signed prescription — decrements stock using FEFO order."""
    rx = await get_prescription(rx_id)
    if rx.status != ConsultationStatus.SIGNED:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Only signed prescriptions can be dispensed")
    if rx.dispensed_at:
        raise HTTPException(status.HTTP_409_CONFLICT, "Already dispensed")

    # Load lines
    lines = await PrescriptionLine.find(PrescriptionLine.prescription_id == rx.id).to_list()

    for line in lines:
        qty_needed = line.duration_days  # Simple: 1 unit per day
        # Deduct from FEFO-ranked lots
        lots = await GRNLot.find(
            GRNLot.drug_id == line.drug_id, 
            GRNLot.remaining_qty > 0
        ).sort(+GRNLot.expiry_date).to_list()
        
        remaining = qty_needed
        for lot in lots:
            if remaining <= 0:
                break
            deduct = min(remaining, lot.remaining_qty)
            lot.remaining_qty -= deduct
            remaining -= deduct
            await lot.save()

        # Update inventory total
        inv = await InventoryItem.find_one(InventoryItem.drug_id == line.drug_id)
        if inv:
            inv.total_quantity = max(0, inv.total_quantity - qty_needed)
            inv.updated_at = datetime.now(timezone.utc)
            await inv.save()

        line.quantity_dispensed = qty_needed
        await line.save()

    now = datetime.now(timezone.utc)
    rx.dispensed_at = now
    await rx.save()

    # Audit
    await AuditLog(
        actor_id=pharmacist.id, actor_label=pharmacist.email,
        action="prescription.dispense", target=f"prescription:{str(rx.id)}",
        level="info",
    ).insert()

    return DispenseResult(
        prescription_id=str(rx.id),
        status="dispensed",
        dispensed_at=now,
        message="Prescription dispensed successfully",
    )
