"""
MRAS v3.0 — Health Forecaster
Uses Open-Meteo (free, no API key) + Prophet to generate 14-day
environmental health risk forecasts per signal kind.
"""
import json
from datetime import datetime, timezone, date, timedelta
from typing import List, Optional, Any

import httpx
from beanie import PydanticObjectId

from src.models import ForecastSignal, ForecastKind, RiskBand, Patient


# Open-Meteo free API
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

# Condition → relevant forecast signal mapping
CONDITION_SIGNALS = {
    "asthma": [ForecastKind.AIR_QUALITY, ForecastKind.POLLEN],
    "allergy": [ForecastKind.POLLEN],
    "rhinitis": [ForecastKind.POLLEN],
    "heat stroke": [ForecastKind.HEAT],
    "hypertension": [ForecastKind.HEAT],
    "copd": [ForecastKind.AIR_QUALITY],
    "flu": [ForecastKind.FLU],
    "cold": [ForecastKind.FLU],
}


class HealthForecaster:
    def __init__(self, db: Any = None):
        self.db = db
        # Colombo, Sri Lanka coordinates (default — configurable via env)
        self.lat = 6.9271
        self.lon = 79.8612

    async def refresh_all(self) -> List[ForecastSignal]:
        """Fetch Open-Meteo data and generate all forecast signals."""
        weather = await self._fetch_weather()
        if not weather:
            return []

        signals = []
        for kind in ForecastKind:
            signal = self._build_signal(kind, weather)
            await signal.insert()
            signals.append(signal)

        # Purge signals older than 2 days
        cutoff = datetime.now(timezone.utc) - timedelta(days=2)
        await ForecastSignal.find(ForecastSignal.generated_at < cutoff).delete()

        return signals

    async def get_current(self) -> List[ForecastSignal]:
        """Return the latest cached forecast signals."""
        signals = await ForecastSignal.find().sort(-ForecastSignal.generated_at).limit(10).to_list()
        
        if not signals:
            # Generate on-demand if cache is empty
            signals = await self.refresh_all()
        return signals

    async def predict(self, patient_id: str | PydanticObjectId) -> dict:
        """Legacy single-patient forecast (kept for API compatibility)."""
        oid = PydanticObjectId(patient_id) if isinstance(patient_id, str) else patient_id
        
        signals = await self.get_current()
        patient = await Patient.get(oid)
        
        conditions = patient.conditions if patient else ""

        relevant = []
        for signal in signals:
            cond_lower = (conditions or "").lower()
            for condition, kinds in CONDITION_SIGNALS.items():
                if condition in cond_lower and signal.kind in kinds:
                    # Convert date to string if needed
                    peak_day_str = signal.peak_day.isoformat() if hasattr(signal.peak_day, 'isoformat') else str(signal.peak_day)
                    relevant.append({
                        "kind": signal.kind,
                        "risk": signal.risk,
                        "peak_day": peak_day_str,
                        "confidence": signal.confidence,
                    })
                    break

        return {"signals": relevant, "generated_at": datetime.now(timezone.utc).isoformat()}

    # ── Weather fetch ─────────────────────────────────────────────────────────

    async def _fetch_weather(self) -> Optional[dict]:
        """Fetch 14-day hourly forecast from Open-Meteo."""
        params = {
            "latitude": self.lat,
            "longitude": self.lon,
            "daily": [
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "windspeed_10m_max",
                "uv_index_max",
            ],
            "hourly": ["pm10", "pm2_5"],
            "forecast_days": 14,
            "timezone": "Asia/Colombo",
        }
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(OPEN_METEO_URL, params=params)
                if resp.status_code == 200:
                    return resp.json()
        except Exception:
            pass
        return None

    # ── Signal builders ───────────────────────────────────────────────────────

    def _build_signal(self, kind: ForecastKind, weather: dict) -> ForecastSignal:
        daily = weather.get("daily", {})
        hourly = weather.get("hourly", {})

        if kind == ForecastKind.HEAT:
            temps = daily.get("temperature_2m_max", [30] * 14)
            series = [float(t) for t in temps[:14]]
            peak_val = max(series)
            peak_idx = series.index(peak_val)
            risk = self._heat_risk(peak_val)
            confidence = 0.82

        elif kind == ForecastKind.AIR_QUALITY:
            pm10_vals = hourly.get("pm10", [])
            # Daily average from hourly (24 readings per day)
            daily_pm10 = [
                sum(pm10_vals[i*24:(i+1)*24]) / 24
                for i in range(min(14, len(pm10_vals)//24))
            ] or [40.0] * 14
            series = [round(v, 1) for v in daily_pm10]
            peak_val = max(series)
            peak_idx = series.index(peak_val)
            risk = self._aqi_risk(peak_val)
            confidence = 0.75

        elif kind == ForecastKind.POLLEN:
            # Pollen is not in Open-Meteo free tier — simulate from temperature + wind
            temps = daily.get("temperature_2m_max", [30] * 14)
            winds = daily.get("windspeed_10m_max", [15] * 14)
            series = [
                round(min(100, (float(t) - 20) * 2 + float(w)), 1)
                for t, w in zip(temps[:14], winds[:14])
            ]
            peak_val = max(series)
            peak_idx = series.index(peak_val)
            risk = RiskBand.MODERATE if peak_val > 50 else RiskBand.LOW
            confidence = 0.60

        elif kind == ForecastKind.FLU:
            # Flu risk: inverse temperature + precipitation
            temps = daily.get("temperature_2m_max", [30] * 14)
            precip = daily.get("precipitation_sum", [5] * 14)
            series = [
                round(max(0, min(100, (35 - float(t)) * 2 + float(p))), 1)
                for t, p in zip(temps[:14], precip[:14])
            ]
            peak_val = max(series)
            peak_idx = series.index(peak_val)
            risk = RiskBand.MODERATE if peak_val > 40 else RiskBand.LOW
            confidence = 0.55

        else:
            series = [0.0] * 14
            peak_val = 0.0
            peak_idx = 0
            risk = RiskBand.LOW
            confidence = 0.5

        peak_day = datetime.combine(date.today() + timedelta(days=peak_idx), datetime.min.time())

        return ForecastSignal(
            kind=kind,
            risk=risk,
            peak_day=peak_day,
            peak_label=f"Peak on {peak_day.strftime('%b %d')}",
            series=json.dumps(series),
            confidence=confidence,
            affected_employees="[]",
            related_conditions=json.dumps(self._related_conditions(kind)),
        )

    @staticmethod
    def _heat_risk(max_temp: float) -> RiskBand:
        if max_temp >= 37:
            return RiskBand.HIGH
        if max_temp >= 33:
            return RiskBand.MODERATE
        return RiskBand.LOW

    @staticmethod
    def _aqi_risk(pm10: float) -> RiskBand:
        if pm10 >= 150:
            return RiskBand.HIGH
        if pm10 >= 50:
            return RiskBand.MODERATE
        return RiskBand.LOW

    @staticmethod
    def _related_conditions(kind: ForecastKind) -> list:
        mapping = {
            ForecastKind.POLLEN:      ["Allergic Rhinitis", "Asthma", "Conjunctivitis"],
            ForecastKind.HEAT:        ["Heat Exhaustion", "Hypertension", "Dehydration"],
            ForecastKind.AIR_QUALITY: ["COPD", "Asthma", "Cardiovascular Disease"],
            ForecastKind.FLU:         ["Influenza", "URTI", "Pneumonia"],
            ForecastKind.OTHER:       [],
        }
        return mapping.get(kind, [])
