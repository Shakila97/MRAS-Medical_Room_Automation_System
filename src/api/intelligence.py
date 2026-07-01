"""
MRAS v3.0 — Intelligence Router
JRISSI scoring, forecasting, and Claude AI pre-visit briefing (streamed via SSE).
"""
import json
from typing import List, Optional

import anthropic
from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.config import settings
from src.core.database import get_db
from src.models.user import User, UserRole
from src.modules.auth_service import require_role
from src.modules.jrissi_scorer import JRISSIScorer, build_report, get_overview
from src.modules.health_forecaster import HealthForecaster
from src.schemas.jrissi import JrissiReport, JrissiOverviewItem, EscalationCreate, EscalationRead

router = APIRouter(tags=["Intelligence"])


# ── JRISSI ────────────────────────────────────────────────────────────────────

@router.get("/jrissi/overview", response_model=List[JrissiOverviewItem],
            summary="JRISSI watchlist — all patients ranked by risk")
async def jrissi_overview(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    return await get_overview(db)


@router.get("/jrissi/stats", summary="Get real workforce JRISSI statistics")
async def jrissi_stats(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    from src.modules.jrissi_scorer import get_workforce_stats
    return await get_workforce_stats(db)


@router.get("/jrissi/{patient_id}", response_model=JrissiReport,
            summary="Get JRISSI report for a patient")
async def jrissi_report(
    patient_id: int,
    window: int = Query(default=14, ge=7, le=90, description="Days"),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    # Trigger a fresh compute then return the report
    if settings.ENABLE_ML_PREDICTIONS:
        scorer = JRISSIScorer(db)
        await scorer.compute(patient_id, window_days=window)
    return await build_report(patient_id, db, window)


@router.post("/jrissi/{patient_id}/escalate", status_code=201,
             summary="Manually escalate a patient")
async def escalate(
    patient_id: int,
    data: EscalationCreate,
    db: AsyncSession = Depends(get_db),
    doctor: User = Depends(require_role(UserRole.DOCTOR)),
):
    from src.models import Notification, NotificationKind, NotificationTone
    notif = Notification(
        kind=NotificationKind.JRISSI_ESCALATION,
        tone=NotificationTone.DANGER,
        title=f"Manual escalation — Patient #{patient_id}",
        body=data.reason,
        target_role='["doctor", "admin"]',
    )
    db.add(notif)
    await db.flush()
    return {"patient_id": patient_id, "notification_id": notif.id, "reason": data.reason}


# ── Forecasting ───────────────────────────────────────────────────────────────

@router.get("/forecasts", summary="14-day environmental health forecasts")
async def forecasts(
    horizon: int = Query(default=14, ge=7, le=30),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    forecaster = HealthForecaster(db)
    signals = await forecaster.get_current()
    result = []
    for s in signals:
        series = json.loads(s.series)[:horizon]
        result.append({
            "id": s.id,
            "kind": s.kind.value,
            "risk": s.risk.value,
            "peak_day": s.peak_day.isoformat(),
            "peak_label": s.peak_label,
            "series": series,
            "confidence": s.confidence,
            "affected_employees": json.loads(s.affected_employees),
            "related_conditions": json.loads(s.related_conditions),
            "generated_at": s.generated_at.isoformat(),
        })
    return result


@router.post("/forecasts/{signal_id}/notify", status_code=204,
             summary="Push pre-alert notifications to affected employees")
async def notify_forecast(
    signal_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    from sqlmodel import select
    from src.models import ForecastSignal, Notification, NotificationKind, NotificationTone
    result = await db.execute(select(ForecastSignal).where(ForecastSignal.id == signal_id))
    signal = result.scalar_one_or_none()
    if signal:
        notif = Notification(
            kind=NotificationKind.FORECAST_WATCH,
            tone=NotificationTone.WARNING,
            title=f"{signal.kind.value.replace('_', ' ').title()} Watch",
            body=f"{signal.peak_label} — Risk level: {signal.risk.value}. "
                 f"Employees with related conditions have been flagged.",
            target_role='["employee", "doctor"]',
        )
        db.add(notif)
    return None


# ── Claude AI Briefing (SSE streaming) ───────────────────────────────────────

@router.get("/briefing/{patient_id}",
            summary="AI pre-visit briefing (streamed via SSE)")
async def ai_briefing(
    patient_id: int,
    db: AsyncSession = Depends(get_db),
    doctor: User = Depends(require_role(UserRole.DOCTOR)),
):
    if not settings.ENABLE_AI_BRIEFING or not settings.ANTHROPIC_API_KEY:
        return {"briefing": "AI briefing not enabled. Set ANTHROPIC_API_KEY in .env"}

    # Load patient context
    from sqlmodel import select
    from src.models import Patient, Consultation, Prescription, JRISSIRecord

    patient_result = await db.execute(select(Patient).where(Patient.id == patient_id))
    patient = patient_result.scalar_one_or_none()
    if not patient:
        from fastapi import HTTPException, status
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

    # Latest JRISSI
    jrissi_result = await db.execute(
        select(JRISSIRecord)
        .where(JRISSIRecord.patient_id == patient_id)
        .order_by(JRISSIRecord.computed_at.desc())
        .limit(1)
    )
    jrissi = jrissi_result.scalar_one_or_none()

    # Last consultation
    consult_result = await db.execute(
        select(Consultation)
        .where(Consultation.patient_id == patient_id)
        .order_by(Consultation.started_at.desc())
        .limit(1)
    )
    last_consult = consult_result.scalar_one_or_none()

    prompt = f"""You are a clinical assistant briefing Dr. {doctor.full_name} before a consultation.

Patient: {patient.full_name}
Employee ID: {patient.employee_id}
Department: {patient.department or 'Unknown'}
Blood type: {patient.blood_type or 'Unknown'}
Allergies: {patient.allergies or 'None documented'}
Known conditions: {patient.conditions or 'None documented'}
JRISSI score: {jrissi.mhrs if jrissi else 'Not computed'} ({jrissi.risk_band.value if jrissi else 'unknown'} risk)
Last consultation: {last_consult.started_at.strftime('%d %b %Y') if last_consult else 'No history'}
Last assessment: {(last_consult.assessment or 'None')[:200] if last_consult else 'N/A'}

Generate a concise pre-visit briefing with THREE sections:
1. **Key Concerns** — top 2-3 things to watch for
2. **Examination Focus** — what to examine or measure
3. **Medication Review** — any flags with current medications

Be clinical, concise (< 200 words total), and avoid speculation."""

    async def stream_response():
        client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
        async with client.messages.stream(
            model=settings.CLAUDE_MODEL,
            max_tokens=400,
            messages=[{"role": "user", "content": prompt}],
        ) as stream:
            async for text in stream.text_stream:
                yield f"data: {json.dumps({'token': text})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        stream_response(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )

# ── Behaviour Correction Engine ───────────────────────────────────────────────

@router.get("/interventions/suggested", summary="Get AI-suggested interventions")
async def suggested_interventions(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    from src.modules.behaviour_engine import BehaviourEngine
    engine = BehaviourEngine(db)
    interventions = await engine.generate_cohort_interventions()
    return interventions

@router.post("/interventions/push", status_code=201, summary="Push approved interventions")
async def push_interventions(
    interventions: list[dict],
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    from src.modules.behaviour_engine import BehaviourEngine
    engine = BehaviourEngine(db)
    await engine.push_interventions_to_employees(interventions)
    return {"status": "ok", "message": f"Pushed {len(interventions)} interventions."}
