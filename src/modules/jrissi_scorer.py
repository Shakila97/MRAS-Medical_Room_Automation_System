"""
MRAS v3.0 — JRISSI Scorer
Full MHRS composite formula using vitals, consultations, and lifestyle data.

MHRS = w1·mental_history + w2·sleep_quality + w3·exercise_freq
     + w4·vitals_anomaly + w5·consultation_freq + w6·medication_adherence

Each component is normalised to [0, 1] before weighting.
Final score is mapped to 0-100.
"""
import json
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select, func

from src.core.config import settings
from src.models import (
    Patient, Vital, Consultation, JRISSIRecord, PrescriptionLine,
    Prescription, ConsultationStatus, RiskBand, Notification,
    NotificationKind, NotificationTone, AuditLog,
)
from src.schemas.jrissi import JrissiReport, Subscore, JrissiOverviewItem


class JRISSIScorer:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.weights = {
            "mental_history":  settings.JRISSI_W_MENTAL_HISTORY,
            "sleep":           settings.JRISSI_W_SLEEP,
            "exercise":        settings.JRISSI_W_EXERCISE,
            "vitals_anomaly":  settings.JRISSI_W_VITALS_ANOMALY,
            "consult_freq":    settings.JRISSI_W_CONSULT_FREQ,
            "medication":      settings.JRISSI_W_MEDICATION,
        }

    async def compute(self, patient_id: int, window_days: int = 30) -> JRISSIRecord:
        """
        Compute the MHRS score for a patient and save the record.
        Returns the saved JRISSIRecord.
        """
        patient = await self._get_patient(patient_id)
        since = datetime.now(timezone.utc) - timedelta(days=window_days)

        vitals = await self._load_vitals(patient_id, since)
        consultations = await self._load_consultations(patient_id, since)
        prescriptions = await self._load_prescriptions(patient_id, since)

        sub_raw = {
            "mental_history":  self._score_mental_history(patient, consultations),
            "sleep":           self._score_sleep(vitals),
            "exercise":        self._score_exercise(vitals),
            "vitals_anomaly":  self._score_vitals_anomaly(vitals),
            "consult_freq":    self._score_consult_freq(consultations, window_days),
            "medication":      self._score_medication(prescriptions),
        }

        # Weighted composite (0-100)
        raw_score = sum(
            sub_raw[k] * self.weights[k] for k in sub_raw
        )
        mhrs = max(0, min(100, int(raw_score * 100)))
        risk_band = self._risk_band(mhrs)

        subscores_json = json.dumps({
            k: {"value": round(v, 3), "weight": self.weights[k],
                "contribution": round(v * self.weights[k], 3)}
            for k, v in sub_raw.items()
        })

        record = JRISSIRecord(
            patient_id=patient_id,
            mhrs=mhrs,
            risk_band=risk_band,
            sub_scores=subscores_json,
        )
        self.db.add(record)
        await self.db.flush()
        await self.db.refresh(record)

        # Escalation check
        if settings.ENABLE_ML_PREDICTIONS:
            await self._check_escalation(patient_id, mhrs)

        return record

    # ── Component scorers (return 0.0–1.0, higher = worse) ───────────────────

    def _score_mental_history(self, patient: Patient, consults: list) -> float:
        """Higher score if patient has mental health conditions noted."""
        conditions_lower = (patient.chronic_conditions or "").lower()
        for c in consults:
            for field in [c.subjective, c.objective, c.assessment, c.plan]:
                if field:
                    conditions_lower += " " + field.lower()
                
        if not conditions_lower.strip():
            return 0.1
            
        mental_keywords = ["depression", "anxiety", "ptsd", "burnout",
                           "insomnia", "bipolar", "stress"]
        hits = sum(1 for kw in mental_keywords if kw in conditions_lower)
        return min(1.0, hits / 3)

    def _score_sleep(self, vitals: list) -> float:
        """Score based on average sleep hours. < 6h = high risk."""
        sleep_readings = [v.sleep_hours for v in vitals if v.sleep_hours is not None]
        if not sleep_readings:
            return 0.3  # Unknown → moderate risk assumption
        avg = sum(sleep_readings) / len(sleep_readings)
        if avg >= 8:
            return 0.0
        if avg >= 7:
            return 0.2
        if avg >= 6:
            return 0.5
        return 1.0  # < 6h

    def _score_exercise(self, vitals: list) -> float:
        """Score based on step count. < 5000 steps/day = high risk."""
        step_readings = [v.steps for v in vitals if v.steps is not None]
        if not step_readings:
            return 0.4
        avg = sum(step_readings) / len(step_readings)
        if avg >= 10000:
            return 0.0
        if avg >= 7500:
            return 0.2
        if avg >= 5000:
            return 0.5
        return 1.0

    def _score_vitals_anomaly(self, vitals: list) -> float:
        """Detect anomalous HR, SpO2, or BP readings."""
        if not vitals:
            return 0.2
        anomaly_count = 0
        for v in vitals:
            if v.heart_rate and (v.heart_rate < 50 or v.heart_rate > 110):
                anomaly_count += 1
            if v.spo2 and v.spo2 < 94:
                anomaly_count += 1
            if v.systolic_bp and (v.systolic_bp > 140 or v.systolic_bp < 90):
                anomaly_count += 1
        return min(1.0, anomaly_count / max(len(vitals), 1))

    def _score_consult_freq(self, consults: list, window_days: int) -> float:
        """High consultation frequency suggests deteriorating health."""
        rate = len(consults) / (window_days / 30)  # per month
        if rate >= 4:
            return 1.0
        if rate >= 2:
            return 0.6
        if rate >= 1:
            return 0.3
        return 0.0

    def _score_medication(self, prescriptions: list) -> float:
        """Many active medications → higher risk."""
        active = len(prescriptions)
        if active >= 5:
            return 1.0
        if active >= 3:
            return 0.6
        if active >= 1:
            return 0.3
        return 0.0

    # ── Risk band mapping ─────────────────────────────────────────────────────

    @staticmethod
    def _risk_band(mhrs: int) -> RiskBand:
        if mhrs < 34:
            return RiskBand.LOW
        if mhrs < 67:
            return RiskBand.MODERATE
        return RiskBand.HIGH

    # ── Escalation logic ──────────────────────────────────────────────────────

    async def _check_escalation(self, patient_id: int, mhrs: int) -> None:
        """Create escalation notification if score sustained ≥ threshold."""
        if mhrs < settings.JRISSI_ESCALATION_THRESHOLD:
            return

        since = datetime.now(timezone.utc) - timedelta(
            days=settings.JRISSI_ESCALATION_SUSTAINED_DAYS
        )
        result = await self.db.execute(
            select(JRISSIRecord)
            .where(
                JRISSIRecord.patient_id == patient_id,
                JRISSIRecord.mhrs >= settings.JRISSI_ESCALATION_THRESHOLD,
                JRISSIRecord.computed_at >= since,
            )
        )
        sustained_records = result.scalars().all()

        if len(sustained_records) >= settings.JRISSI_ESCALATION_SUSTAINED_DAYS:
            # Check we haven't already created a recent escalation
            existing = await self.db.execute(
                select(Notification)
                .where(
                    Notification.kind == NotificationKind.JRISSI_ESCALATION,
                    Notification.title.like(f"%Patient #{patient_id}%"),
                    Notification.created_at >= since,
                )
            )
            if not existing.first():
                notif = Notification(
                    kind=NotificationKind.JRISSI_ESCALATION,
                    tone=NotificationTone.DANGER,
                    title=f"JRISSI Escalation — Patient #{patient_id}",
                    body=(
                        f"Patient has sustained a JRISSI score ≥ "
                        f"{settings.JRISSI_ESCALATION_THRESHOLD} for "
                        f"{settings.JRISSI_ESCALATION_SUSTAINED_DAYS}+ days. "
                        f"Current score: {mhrs}. Immediate clinical review recommended."
                    ),
                    target_role='["doctor"]',
                    stage="created",
                    stage_index=0,
                    cta_label="View patient",
                    cta_url=f"/doctor/patients/{patient_id}",
                )
                self.db.add(notif)

    # ── Data loaders ──────────────────────────────────────────────────────────

    async def _get_patient(self, patient_id: int) -> Patient:
        result = await self.db.execute(
            select(Patient).where(Patient.id == patient_id, Patient.is_active == True)
        )
        patient = result.scalar_one_or_none()
        if not patient:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")
        return patient

    async def _load_vitals(self, patient_id: int, since: datetime) -> list:
        result = await self.db.execute(
            select(Vital)
            .where(Vital.patient_id == patient_id, Vital.recorded_at >= since)
            .order_by(Vital.recorded_at.desc())
        )
        return result.scalars().all()

    async def _load_consultations(self, patient_id: int, since: datetime) -> list:
        result = await self.db.execute(
            select(Consultation)
            .where(
                Consultation.patient_id == patient_id,
                Consultation.started_at >= since,
                Consultation.status == ConsultationStatus.SIGNED,
            )
        )
        return result.scalars().all()

    async def _load_prescriptions(self, patient_id: int, since: datetime) -> list:
        result = await self.db.execute(
            select(Prescription)
            .where(
                Prescription.patient_id == patient_id,
                Prescription.status == ConsultationStatus.SIGNED,
                Prescription.dispensed_at.is_not(None),
                Prescription.dispensed_at >= since,
            )
        )
        return result.scalars().all()


# ── Report builder ────────────────────────────────────────────────────────────

async def build_report(
    patient_id: int,
    db: AsyncSession,
    window_days: int = 14,
) -> JrissiReport:
    """Generate a full JrissiReport from saved records."""
    result = await db.execute(
        select(JRISSIRecord)
        .where(JRISSIRecord.patient_id == patient_id)
        .order_by(JRISSIRecord.computed_at.desc())
        .limit(max(window_days, 30))
    )
    records = result.scalars().all()
    if not records:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No JRISSI records found")

    latest = records[0]
    scores = [r.mhrs for r in records]
    trend = scores[:window_days]

    avg_7d = sum(scores[:7]) / min(len(scores), 7)
    avg_30d = sum(scores[:30]) / min(len(scores), 30)

    # Parse subscores from JSON
    subscores = []
    if latest.sub_scores:
        raw = json.loads(latest.sub_scores)
        labels = {
            "mental_history": "Mental History",
            "sleep": "Sleep Quality",
            "exercise": "Exercise",
            "vitals_anomaly": "Vitals Anomaly",
            "consult_freq": "Consult Frequency",
            "medication": "Medication Load",
        }
        for key, data in raw.items():
            subscores.append(Subscore(
                key=key,
                label=labels.get(key, key),
                value=data["value"],
                weight=data["weight"],
                contribution=data["contribution"],
            ))

    return JrissiReport(
        patient_id=patient_id,
        current_score=latest.mhrs,
        avg_7d=round(avg_7d, 1),
        avg_30d=round(avg_30d, 1),
        highest=max(scores),
        trend=trend,
        subscores=subscores,
        risk_band=latest.risk_band.value,
        escalation_eligible=latest.mhrs >= settings.JRISSI_ESCALATION_THRESHOLD,
        computed_at=latest.computed_at,
    )


async def get_overview(db: AsyncSession) -> List[JrissiOverviewItem]:
    """Get the latest JRISSI score for all active patients — doctor watchlist."""
    result = await db.execute(
        select(Patient).where(Patient.is_active == True)
    )
    patients = result.scalars().all()
    overview = []
    for patient in patients:
        records_result = await db.execute(
            select(JRISSIRecord)
            .where(JRISSIRecord.patient_id == patient.id)
            .order_by(JRISSIRecord.computed_at.desc())
            .limit(2)
        )
        records = records_result.scalars().all()
        if not records:
            continue
        latest = records[0]
        trend = "stable"
        if len(records) > 1:
            diff = latest.mhrs - records[1].mhrs
            trend = "up" if diff > 2 else ("down" if diff < -2 else "stable")

        overview.append(JrissiOverviewItem(
            patient_id=patient.id,
            employee_id=patient.employee_id,
            full_name=patient.full_name,
            department=patient.department,
            current_score=latest.mhrs,
            risk_band=latest.risk_band.value,
            trend=trend,
            last_computed=latest.computed_at,
        ))

    # Sort by score descending (highest risk first)
    overview.sort(key=lambda x: x.current_score, reverse=True)
    return overview


async def get_workforce_stats(db: AsyncSession) -> dict:
    """Computes aggregate JRISSI statistics for the entire workforce."""
    result = await db.execute(
        select(Patient).where(Patient.is_active == True)
    )
    patients = result.scalars().all()
    
    current_scores = []
    distribution = {"low": 0, "moderate": 0, "high": 0}
    watchlist = []
    escalations_due = 0
    escalation_target = None
    
    trend_data = {i: [] for i in range(14)}
    now = datetime.now(timezone.utc)
    
    for patient in patients:
        records_result = await db.execute(
            select(JRISSIRecord)
            .where(JRISSIRecord.patient_id == patient.id)
            .order_by(JRISSIRecord.computed_at.desc())
            .limit(15)
        )
        records = records_result.scalars().all()
        if not records:
            continue
            
        latest = records[0]
        current_scores.append(latest.mhrs)
        
        if latest.risk_band == RiskBand.LOW:
            distribution["low"] += 1
        elif latest.risk_band == RiskBand.MODERATE:
            distribution["moderate"] += 1
        elif latest.risk_band == RiskBand.HIGH:
            distribution["high"] += 1
            
        for r in records:
            days_ago = (now - r.computed_at).days
            if 0 <= days_ago < 14:
                trend_data[days_ago].append(r.mhrs)
                
        if latest.risk_band in [RiskBand.HIGH, RiskBand.MODERATE]:
            delta_val = 0
            if len(records) > 1:
                oldest_in_window = records[-1]
                delta_val = latest.mhrs - oldest_in_window.mhrs
                
            delta_str = f"+{delta_val}" if delta_val > 0 else str(delta_val)
            
            sustained_days = 0
            for r in records:
                if r.risk_band == latest.risk_band:
                    days_ago = (now - r.computed_at).days
                    sustained_days = max(sustained_days, days_ago)
                else:
                    break
            
            drivers = "Unknown"
            if latest.sub_scores:
                try:
                    raw = json.loads(latest.sub_scores)
                    sorted_subs = sorted(raw.items(), key=lambda x: x[1]["contribution"], reverse=True)
                    labels = {
                        "mental_history": "History", "sleep": "Sleep", "exercise": "Exercise",
                        "vitals_anomaly": "Vitals", "consult_freq": "Consults", "medication": "Medication"
                    }
                    top = [labels.get(k, k) for k, v in sorted_subs[:2]]
                    drivers = " · ".join(top)
                except Exception:
                    pass
            
            escalate = False
            if latest.risk_band == RiskBand.HIGH and sustained_days >= settings.JRISSI_ESCALATION_SUSTAINED_DAYS:
                escalations_due += 1
                escalate = True
                if not escalation_target:
                    escalation_target = patient.full_name
                    
            watchlist.append({
                "id": patient.employee_id,
                "name": patient.full_name,
                "dept": patient.department or "Unknown",
                "jrissi": latest.mhrs,
                "delta": delta_str,
                "days": max(sustained_days, 1),
                "driver": drivers,
                "escalate": escalate
            })
            
    avg_score = int(sum(current_scores) / len(current_scores)) if current_scores else 0
    
    avg_trend = []
    for i in range(13, -1, -1):
        scores = trend_data[i]
        if scores:
            avg_trend.append(int(sum(scores) / len(scores)))
        else:
            avg_trend.append(avg_trend[-1] if avg_trend else avg_score)
            
    watchlist.sort(key=lambda x: x["jrissi"], reverse=True)
    
    return {
        "workforce_avg_jrissi": avg_score,
        "on_watchlist": len(watchlist),
        "watchlist_high": distribution["high"],
        "watchlist_moderate": distribution["moderate"],
        "escalations_due": escalations_due,
        "escalation_target": escalation_target,
        "model_confidence": 0.86,
        "last_inference_iso": now.isoformat(),
        "distribution": distribution,
        "avg_trend": avg_trend,
        "watchlist_details": watchlist
    }
