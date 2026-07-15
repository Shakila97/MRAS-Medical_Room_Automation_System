"""
MRAS v3.0 — Intelligence Router
JRISSI scoring, forecasting, and Claude AI pre-visit briefing (streamed via SSE).
"""
import json
from typing import List, Optional

import anthropic
from fastapi import APIRouter, Depends, Query, HTTPException, status
from fastapi.responses import StreamingResponse
from beanie import PydanticObjectId

from src.core.config import settings
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
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    return await get_overview()


@router.get("/jrissi/stats", summary="Get real workforce JRISSI statistics")
async def jrissi_stats(
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    from src.modules.jrissi_scorer import get_workforce_stats
    return await get_workforce_stats()


@router.get("/jrissi/{patient_id}", response_model=JrissiReport,
            summary="Get JRISSI report for a patient")
async def jrissi_report(
    patient_id: str,
    window: int = Query(default=14, ge=7, le=90, description="Days"),
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    # Trigger a fresh compute then return the report
    if settings.ENABLE_ML_PREDICTIONS:
        scorer = JRISSIScorer()
        await scorer.compute(patient_id, window_days=window)
    return await build_report(patient_id, window_days=window)


@router.post("/jrissi/{patient_id}/escalate", status_code=201,
             summary="Manually escalate a patient")
async def escalate(
    patient_id: str,
    data: EscalationCreate,
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
    await notif.insert()
    return {"patient_id": patient_id, "notification_id": str(notif.id), "reason": data.reason}


# ── Forecasting ───────────────────────────────────────────────────────────────

@router.get("/forecasts", summary="14-day environmental health forecasts")
async def forecasts(
    horizon: int = Query(default=14, ge=7, le=30),
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    forecaster = HealthForecaster()
    signals = await forecaster.get_current()
    result = []
    for s in signals:
        series = json.loads(s.series) if isinstance(s.series, str) else s.series
        series = series[:horizon]
        
        aff_emp = json.loads(s.affected_employees) if isinstance(s.affected_employees, str) else s.affected_employees
        rel_cond = json.loads(s.related_conditions) if isinstance(s.related_conditions, str) else s.related_conditions
        
        peak_day_str = s.peak_day.isoformat() if hasattr(s.peak_day, 'isoformat') else str(s.peak_day)
        gen_at_str = s.generated_at.isoformat() if hasattr(s.generated_at, 'isoformat') else str(s.generated_at)
        
        result.append({
            "id": str(s.id),
            "kind": s.kind.value,
            "risk": s.risk.value,
            "peak_day": peak_day_str,
            "peak_label": s.peak_label,
            "series": series,
            "confidence": s.confidence,
            "affected_employees": aff_emp,
            "related_conditions": rel_cond,
            "generated_at": gen_at_str,
        })
    return result


@router.post("/forecasts/{signal_id}/notify", status_code=204,
             summary="Push pre-alert notifications to affected employees")
async def notify_forecast(
    signal_id: str,
    _: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN)),
):
    from src.models import ForecastSignal, Notification, NotificationKind, NotificationTone
    
    oid = PydanticObjectId(signal_id) if isinstance(signal_id, str) else signal_id
    signal = await ForecastSignal.get(oid)
    
    if signal:
        notif = Notification(
            kind=NotificationKind.FORECAST_WATCH,
            tone=NotificationTone.WARNING,
            title=f"{signal.kind.value.replace('_', ' ').title()} Watch",
            body=f"{signal.peak_label} — Risk level: {signal.risk.value}. "
                 f"Employees with related conditions have been flagged.",
            target_role='["employee", "doctor"]',
        )
        await notif.insert()
    return None


# ── Claude AI Briefing (SSE streaming) ───────────────────────────────────────

@router.get("/briefing/{patient_id}",
            summary="AI pre-visit briefing (streamed via SSE)")
async def ai_briefing(
    patient_id: str,
    doctor: User = Depends(require_role(UserRole.DOCTOR)),
):
    if not settings.ENABLE_AI_BRIEFING or not settings.ANTHROPIC_API_KEY:
        return {"briefing": "AI briefing not enabled. Set ANTHROPIC_API_KEY in .env"}

    # Load patient context
    from src.models import Patient, Consultation, JRISSIRecord

    oid = PydanticObjectId(patient_id) if isinstance(patient_id, str) else patient_id
    patient = await Patient.get(oid)
    if not patient:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

    # Latest JRISSI
    jrissi = await JRISSIRecord.find(
        JRISSIRecord.patient_id == oid
    ).sort(-JRISSIRecord.computed_at).first_or_none()

    # Last consultation
    last_consult = await Consultation.find(
        Consultation.patient_id == oid
    ).sort(-Consultation.started_at).first_or_none()

    prompt = f"""You are a clinical assistant briefing Dr. {doctor.full_name} before a consultation.

Patient: {patient.full_name}
Employee ID: {patient.employee_id}
Department: {getattr(patient, 'department', 'Unknown')}
Blood type: {getattr(patient, 'blood_type', 'Unknown')}
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
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    from src.modules.behaviour_engine import BehaviourEngine
    engine = BehaviourEngine()
    interventions = await engine.generate_cohort_interventions()
    return interventions

@router.post("/interventions/push", status_code=201, summary="Push approved interventions")
async def push_interventions(
    interventions: list[dict],
    _: User = Depends(require_role(UserRole.DOCTOR)),
):
    from src.modules.behaviour_engine import BehaviourEngine
    engine = BehaviourEngine()
    await engine.push_interventions_to_employees(interventions)
    return {"status": "ok", "message": f"Pushed {len(interventions)} interventions."}
