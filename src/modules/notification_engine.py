"""
MRAS v3.0 — Notification Engine (Closed-Loop Smart Notifications)
Generates personalised, AI-driven health interventions and delivers them
via WhatsApp (Twilio) and Email (SendGrid).

Flow:
    1. Risk event detected (JRISSI High/Critical or Forecaster alert)
    2. Claude API generates personalised intervention message
    3. Message delivered via Twilio WhatsApp + SendGrid Email
    4. Escalation monitor tracks resolution (14-day window)
"""

import anthropic
import httpx
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.config import settings


class NotificationEngine:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.claude = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

    async def send_intervention(self, employee_id: int, risk_context: dict) -> dict:
        """
        Generate and dispatch a personalised health intervention.
        """
        message = await self._generate_message(risk_context)
        whatsapp_status = await self._send_whatsapp(employee_id, message)
        email_status = await self._send_email(employee_id, message)

        return {
            "employee_id": employee_id,
            "message": message,
            "whatsapp": whatsapp_status,
            "email": email_status,
        }

    async def _generate_message(self, risk_context: dict) -> str:
        """Use Claude API to generate a personalised intervention."""
        prompt = (
            f"You are MRAS, a corporate health assistant. "
            f"An employee has the following risk context: {risk_context}. "
            f"Write a concise, empathetic, and actionable health intervention message "
            f"(max 3 sentences) that they should receive on WhatsApp."
        )
        response = self.claude.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=200,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text

    async def _send_whatsapp(self, employee_id: int, message: str) -> str:
        """Send message via Twilio WhatsApp API. TODO: fetch phone from DB."""
        # TODO: real Twilio call
        return "queued"

    async def _send_email(self, employee_id: int, message: str) -> str:
        """Send email via SendGrid. TODO: fetch email from DB."""
        # TODO: real SendGrid call
        return "queued"

    async def check_escalation(self, employee_id: int) -> bool:
        """
        Return True if High/Critical risk has persisted 14+ days without a consultation.
        Triggers a doctor alert if True.
        """
        # TODO: query risk_log table for sustained High/Critical entries
        return False
