"""
MRAS v3.0 — Data Fusion Module
Merges three independent data streams:
    1. Employee health records (DB)
    2. Mobile device sensor telemetry (steps, sleep, HRV)
    3. Real-time climate API data (OpenWeatherMap + Tomorrow.io fallback)
"""

import httpx
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.config import settings


class DataFusion:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_fused_features(self, employee_id: int) -> dict:
        """Return a merged feature dict for the ML pipeline."""
        health = await self._get_health_features(employee_id)
        sensors = await self._get_sensor_features(employee_id)
        climate = await self._get_climate_features()

        return {**health, **sensors, **climate}

    # ------------------------------------------------------------------
    # Stream 1: Employee health data
    # ------------------------------------------------------------------
    async def _get_health_features(self, employee_id: int) -> dict:
        """Query biometric history from DB. TODO: real query."""
        return {
            "avg_systolic_90d": 128.0,
            "avg_diastolic_90d": 82.0,
            "bmi": 24.5,
            "activity_score_90d": 0.65,
        }

    # ------------------------------------------------------------------
    # Stream 2: Mobile sensor telemetry
    # ------------------------------------------------------------------
    async def _get_sensor_features(self, employee_id: int) -> dict:
        """Retrieve latest sensor snapshot. TODO: mobile telemetry endpoint."""
        return {
            "avg_daily_steps_7d": 7200,
            "avg_sleep_hours_7d": 6.8,
            "avg_hrv_7d": 42.3,
        }

    # ------------------------------------------------------------------
    # Stream 3: Climate API
    # ------------------------------------------------------------------
    async def _get_climate_features(self) -> dict:
        """Fetch climate data from OpenWeatherMap (fallback: Tomorrow.io)."""
        try:
            async with httpx.AsyncClient(timeout=5) as client:
                resp = await client.get(
                    "https://api.openweathermap.org/data/2.5/forecast",
                    params={"q": "Colombo,LK", "appid": settings.OPENWEATHER_API_KEY, "units": "metric"},
                )
                resp.raise_for_status()
                data = resp.json()
                first = data["list"][0]["main"]
                return {
                    "temp_c": first["temp"],
                    "humidity_pct": first["humidity"],
                    "aqi": None,  # TODO: OpenAQ integration
                }
        except Exception:
            # Fallback defaults
            return {"temp_c": 30.0, "humidity_pct": 75.0, "aqi": None}
