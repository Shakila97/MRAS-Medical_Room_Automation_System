"""
MRAS v3.0 — JRISSI Scorer
Job-Role Intensity and Social Support Index (JRISSI)
Computes a 0–100 Mental Health Risk Score (MHRS) for each employee.

Sub-scores:
    JII  — Job Intensity Index      (work hours, on-call frequency, physical demand)
    SSI  — Social Support Index     (team size, HR interactions, leave utilisation)
    PHT  — Physical Health Trend    (BP, BMI, activity levels over 90 days)
    CPI  — Consultation Pattern     (frequency, diagnosis categories)

Final MHRS = w1*JII + w2*(100-SSI) + w3*PHT + w4*CPI
"""

from sqlalchemy.ext.asyncio import AsyncSession


class JRISSIScorer:
    # Calibrated weights from OSMI 2016–2023 dataset
    WEIGHTS = {"JII": 0.35, "SSI": 0.25, "PHT": 0.25, "CPI": 0.15}

    def __init__(self, session: AsyncSession):
        self.session = session

    async def compute(self, employee_id: int) -> dict:
        """
        Compute the full JRISSI score breakdown for an employee.
        Returns MHRS (0–100) and individual sub-scores.
        """
        jii = await self._job_intensity(employee_id)
        ssi = await self._social_support(employee_id)
        pht = await self._physical_health_trend(employee_id)
        cpi = await self._consultation_pattern(employee_id)

        mhrs = (
            self.WEIGHTS["JII"] * jii
            + self.WEIGHTS["SSI"] * (100 - ssi)
            + self.WEIGHTS["PHT"] * pht
            + self.WEIGHTS["CPI"] * cpi
        )

        return {
            "mhrs": round(mhrs, 2),
            "risk_band": self._risk_band(mhrs),
            "sub_scores": {"JII": jii, "SSI": ssi, "PHT": pht, "CPI": cpi},
        }

    def _risk_band(self, score: float) -> str:
        if score < 30:
            return "Low"
        elif score < 60:
            return "Moderate"
        elif score < 80:
            return "High"
        return "Critical"

    # ------------------------------------------------------------------
    # Sub-score calculators (TODO: implement with real DB queries)
    # ------------------------------------------------------------------

    async def _job_intensity(self, employee_id: int) -> float:
        """Score 0–100: higher = more intense job role."""
        return 50.0  # placeholder

    async def _social_support(self, employee_id: int) -> float:
        """Score 0–100: higher = stronger support network."""
        return 60.0  # placeholder

    async def _physical_health_trend(self, employee_id: int) -> float:
        """Score 0–100: higher = more deterioration over 90 days."""
        return 40.0  # placeholder

    async def _consultation_pattern(self, employee_id: int) -> float:
        """Score 0–100: higher = more frequent / concerning visit pattern."""
        return 30.0  # placeholder
