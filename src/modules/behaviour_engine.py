import json
import anthropic
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select, desc
from datetime import datetime, timezone, timedelta

from src.core.config import settings
from src.models import (
    JRISSIRecord, 
    Patient, 
    RiskBand, 
    ForecastSignal, 
    Notification, 
    NotificationKind, 
    NotificationTone
)

class BehaviourEngine:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def generate_cohort_interventions(self) -> List[Dict[str, Any]]:
        """
        Analyzes the workforce risk (JRISSI + Forecasts) and asks Claude
        to suggest 3-5 personalized interventions for cohorts.
        """
        if not settings.ENABLE_AI_BRIEFING or not settings.ANTHROPIC_API_KEY:
            # Fallback mock if Claude is disabled
            return [
                {
                    "icon": "psychology",
                    "tone": "danger",
                    "conf": 0.91,
                    "title": "A. Perera likely to breach escalation threshold today",
                    "body": "14-day sustained High projected to continue. Recommend OH referral within 48 h.",
                    "when": "Now",
                    "pid": "E-002417"
                }
            ]

        # 1. Fetch High/Moderate JRISSI records (latest per patient)
        stmt_jrissi = (
            select(JRISSIRecord, Patient)
            .join(Patient, Patient.id == JRISSIRecord.patient_id)
            .where(JRISSIRecord.risk_band.in_([RiskBand.HIGH, RiskBand.MODERATE]))
            .order_by(desc(JRISSIRecord.computed_at))
            .limit(20)
        )
        result_jrissi = await self.db.execute(stmt_jrissi)
        jrissi_data = result_jrissi.all()
        
        # Deduplicate to get the latest per patient
        seen_patients = set()
        at_risk_profiles = []
        for j_record, patient in jrissi_data:
            if patient.id not in seen_patients:
                seen_patients.add(patient.id)
                at_risk_profiles.append({
                    "patient_id": patient.id,
                    "employee_id": patient.employee_id,
                    "department": patient.department,
                    "mhrs_score": j_record.mhrs,
                    "risk_band": j_record.risk_band.value,
                    "drivers": j_record.drivers
                })

        # 2. Fetch recent forecast signals
        recent_cutoff = datetime.now(timezone.utc) - timedelta(days=3)
        stmt_forecast = (
            select(ForecastSignal)
            .where(ForecastSignal.generated_at >= recent_cutoff)
            .order_by(desc(ForecastSignal.generated_at))
            .limit(5)
        )
        result_forecast = await self.db.execute(stmt_forecast)
        forecasts = []
        for f in result_forecast.scalars().all():
            forecasts.append({
                "kind": f.kind.value,
                "risk": f.risk.value,
                "peak_label": f.peak_label,
                "related_conditions": json.loads(f.related_conditions) if f.related_conditions else []
            })

        # 3. Construct the prompt
        prompt = f"""You are the Behaviour Correction Engine for a corporate medical room.
Analyze the following anonymized risk data of the workforce and generate 3 to 5 targeted health interventions.

High/Moderate Risk Employees (JRISSI):
{json.dumps(at_risk_profiles, indent=2)}

Environmental Forecast Signals:
{json.dumps(forecasts, indent=2)}

Instructions:
1. Identify clusters (e.g. night-shift, high stress in engineering) or severe individual risks.
2. Suggest actionable, time-bounded interventions for these cohorts or individuals.
3. Return the response ONLY as a JSON array of objects with the following keys:
   - "icon": a material design icon name (e.g. "psychology", "groups", "cloud", "bedtime")
   - "tone": "danger", "warning", "info", or "success"
   - "conf": a float between 0.70 and 0.99 indicating confidence
   - "title": a short title for the intervention
   - "body": a concise 2-sentence description of the intervention
   - "when": timeframe string (e.g. "Now", "This week")
   - "pid": (Optional) the employee_id if it targets a specific individual
   - "target_patient_ids": (Optional) an array of integer patient_ids to target

Return ONLY valid JSON.
"""

        # 4. Call Claude API
        client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
        response = await client.messages.create(
            model=settings.CLAUDE_MODEL,
            max_tokens=1000,
            system="You are an AI designed to output only valid JSON without markdown wrapping or extra text.",
            messages=[{"role": "user", "content": prompt}],
        )
        
        response_text = response.content[0].text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()
        elif response_text.startswith("```"):
            response_text = response_text[3:-3].strip()

        try:
            interventions = json.loads(response_text)
            return interventions
        except json.JSONDecodeError as e:
            print("Failed to parse Claude JSON response:", response_text)
            return []

    async def push_interventions_to_employees(self, interventions: List[Dict[str, Any]]):
        """
        Takes the approved interventions and creates Notification records
        for the targeted employees or the general employee cohort.
        """
        for intervention in interventions:
            body = intervention.get("body", "")
            title = intervention.get("title", "")
            tone_str = intervention.get("tone", "info")
            
            try:
                tone = NotificationTone(tone_str)
            except ValueError:
                tone = NotificationTone.INFO

            notif = Notification(
                kind=NotificationKind.SYSTEM,  # Using SYSTEM for generic interventions
                tone=tone,
                title=title,
                body=body,
                target_role='["employee"]',
            )
            self.db.add(notif)
            
        await self.db.commit()
        return True
