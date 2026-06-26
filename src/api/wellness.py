"""
MRAS v3.0 — Wellness & Appointments Router
Employee wellness home, appointment booking, QR check-in, SSE stream.
"""
import json
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.core.config import settings
from src.core.database import get_db
from src.models.user import User, UserRole
from src.models import Patient, Appointment, AppointmentStatus, Vital
from src.modules.auth_service import get_current_user, require_role
from src.modules.notification_engine import manager
from src.schemas.wellness import (
    WellnessHome, Metric, AppointmentCreate, AppointmentRead,
    CheckInRequest, CheckInResponse,
)

router = APIRouter(tags=["Wellness & Appointments"])


# ── Wellness Home ─────────────────────────────────────────────────────────────

@router.get("/me/wellness", response_model=WellnessHome,
            summary="My wellness summary")
async def my_wellness(
    window: str = Query(default="7d"),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    days = int(window.replace("d", ""))
    since = datetime.now(timezone.utc) - timedelta(days=days)

    patient_result = await db.execute(
        select(Patient).where(Patient.user_id == user.id)
    )
    patient = patient_result.scalar_one_or_none()

    vitals_result = await db.execute(
        select(Vital)
        .where(Vital.patient_id == patient.id if patient else -1, Vital.recorded_at >= since)
        .order_by(Vital.recorded_at.asc())
    )
    vitals = vitals_result.scalars().all() if patient else []

    # Build simulated wellness score from vitals
    scores = []
    for v in vitals:
        s = 70
        if v.sleep_hours and v.sleep_hours >= 7:
            s += 10
        if v.steps and v.steps >= 8000:
            s += 10
        if v.spo2 and v.spo2 >= 97:
            s += 5
        if v.heart_rate and 60 <= v.heart_rate <= 90:
            s += 5
        scores.append(min(100, s))

    current_score = scores[-1] if scores else 72
    prev_score = scores[0] if len(scores) > 1 else current_score
    series = scores if scores else [72] * days

    metrics = []
    if vitals:
        last = vitals[-1]
        if last.heart_rate:
            metrics.append(Metric(key="hr", label="Heart Rate",
                                  value=last.heart_rate, unit="bpm", trend="stable"))
        if last.spo2:
            metrics.append(Metric(key="spo2", label="SpO₂",
                                  value=last.spo2, unit="%", trend="stable"))
        if last.steps:
            metrics.append(Metric(key="steps", label="Steps",
                                  value=last.steps, unit="steps", trend="up"))
        if last.sleep_hours:
            metrics.append(Metric(key="sleep", label="Sleep",
                                  value=last.sleep_hours, unit="hrs", trend="stable"))

    return WellnessHome(
        score=current_score,
        score_delta=current_score - prev_score,
        series=series,
        metrics=metrics,
    )


# ── Appointments ──────────────────────────────────────────────────────────────

@router.get("/appointments/availability", summary="Available appointment slots")
async def availability(
    date: Optional[str] = Query(default=None),
    duration: int = Query(default=15),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Returns simulated available slots. Wire to real scheduling in production."""
    from datetime import date as dt_date
    appt_date = dt_date.fromisoformat(date) if date else dt_date.today()
    slots = []
    for hour in range(8, 16):
        for minute in [0, 30]:
            slots.append({
                "start": f"{appt_date.isoformat()}T{hour:02d}:{minute:02d}:00",
                "end": f"{appt_date.isoformat()}T{hour:02d}:{minute+duration:02d}:00",
                "available": True,
            })
    return slots


@router.post("/appointments", response_model=AppointmentRead, status_code=201,
             summary="Book an appointment + issue QR token")
async def book_appointment(
    data: AppointmentCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    patient_result = await db.execute(select(Patient).where(Patient.user_id == user.id))
    patient = patient_result.scalar_one_or_none()
    if not patient:
        from fastapi import HTTPException, status
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient profile not found")

    appt = Appointment(
        patient_id=patient.id,
        doctor_id=data.doctor_id,
        scheduled_at=data.scheduled_at,
        duration_minutes=data.duration_minutes,
        notes=data.notes,
        status=AppointmentStatus.BOOKED,
    )
    db.add(appt)
    await db.flush()
    await db.refresh(appt)

    # Issue short-lived QR JWT (15 min)
    qr_payload = {
        "appointment_id": appt.id,
        "employee_id": patient.employee_id,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
    }
    token = jwt.encode(qr_payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    appt.qr_token = token
    appt.qr_expires_at = datetime.now(timezone.utc) + timedelta(minutes=15)
    db.add(appt)
    return appt


@router.patch("/appointments/{appt_id}", response_model=AppointmentRead,
              summary="Reschedule appointment")
async def reschedule(
    appt_id: int,
    scheduled_at: datetime,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(Appointment).where(Appointment.id == appt_id))
    appt = result.scalar_one_or_none()
    if appt:
        appt.scheduled_at = scheduled_at
        db.add(appt)
    return appt


@router.delete("/appointments/{appt_id}", status_code=204,
               summary="Cancel appointment")
async def cancel(
    appt_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(Appointment).where(Appointment.id == appt_id))
    appt = result.scalar_one_or_none()
    if appt:
        appt.status = AppointmentStatus.CANCELLED
        db.add(appt)
    return None


# ── Kiosk Check-in ────────────────────────────────────────────────────────────

@router.post("/checkin", response_model=CheckInResponse,
             summary="Kiosk QR check-in")
async def checkin(
    data: CheckInRequest,
    db: AsyncSession = Depends(get_db),
):
    from fastapi import HTTPException, status as http_status
    try:
        payload = jwt.decode(data.qr_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        appt_id = payload["appointment_id"]
    except Exception:
        raise HTTPException(http_status.HTTP_400_BAD_REQUEST, "Invalid or expired QR token")

    result = await db.execute(select(Appointment).where(Appointment.id == appt_id))
    appt = result.scalar_one_or_none()
    if not appt:
        raise HTTPException(http_status.HTTP_404_NOT_FOUND, "Appointment not found")

    appt.status = AppointmentStatus.CHECKED_IN
    appt.checked_in_at = datetime.now(timezone.utc)
    db.add(appt)

    patient_result = await db.execute(select(Patient).where(Patient.id == appt.patient_id))
    patient = patient_result.scalar_one_or_none()
    patient_name = patient.full_name if patient else "Unknown"

    # Push live event to doctor's WebSocket stream
    await manager.broadcast_to_role("doctor", {
        "type": "checkin",
        "data": {
            "appointment_id": appt_id,
            "patient_name": patient_name,
            "checked_in_at": appt.checked_in_at.isoformat(),
        }
    })

    return CheckInResponse(
        session_token=data.qr_token,
        room="Medical Room 1",
        doctor_name="Dr. Withana",
        patient_name=patient_name,
        appointment_id=appt_id,
    )


@router.get("/checkin/stream", summary="SSE stream — doctor waiting room updates")
async def checkin_stream(_: User = Depends(require_role(UserRole.DOCTOR))):
    """SSE endpoint that pushes check-in events to the doctor's dashboard."""
    async def event_stream():
        yield "data: {\"type\": \"connected\"}\n\n"
        import asyncio
        while True:
            await asyncio.sleep(30)
            yield "data: {\"type\": \"ping\"}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache"})
