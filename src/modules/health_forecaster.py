"""
MRAS v3.0 — Health Forecaster
Primary  : OpenWeatherMap (5-day/3h forecast + Air Pollution API)
Backup   : Open-Meteo (free, no API key, 14-day window)

Strategy:
  1. Try OpenWeatherMap if OPENWEATHER_API_KEY is configured
  2. If OWM fails (network error, bad key, rate-limit) → auto-switch to Open-Meteo
  3. Open-Meteo never fails (no auth) — always returns data
"""
import json
import logging
from datetime import datetime, timezone, date, timedelta
from typing import List, Optional, Any
from collections import defaultdict

import httpx
from beanie import PydanticObjectId

from src.core.config import settings
from src.models import ForecastSignal, ForecastKind, RiskBand, Patient


# ── API endpoints ─────────────────────────────────────────────────────────────

# OpenWeatherMap
OWM_FORECAST_URL     = "https://api.openweathermap.org/data/2.5/forecast"
OWM_AIR_POLL_URL     = "http://api.openweathermap.org/data/2.5/air_pollution/forecast"

# Open-Meteo (free backup, no key required)
OPEN_METEO_URL       = "https://api.open-meteo.com/v1/forecast"

logger = logging.getLogger(__name__)


# Condition → relevant forecast signal mapping
CONDITION_SIGNALS = {
    "asthma":      [ForecastKind.AIR_QUALITY, ForecastKind.POLLEN],
    "allergy":     [ForecastKind.POLLEN],
    "rhinitis":    [ForecastKind.POLLEN],
    "heat stroke": [ForecastKind.HEAT],
    "hypertension":[ForecastKind.HEAT],
    "copd":        [ForecastKind.AIR_QUALITY],
    "flu":         [ForecastKind.FLU],
    "cold":        [ForecastKind.FLU],
}


class HealthForecaster:
    def __init__(self, db: Any = None):
        self.db  = db
        self.lat = settings.OPENWEATHER_LAT
        self.lon = settings.OPENWEATHER_LON

    # ── Public API ────────────────────────────────────────────────────────────

    async def refresh_all(self) -> List[ForecastSignal]:
        """Fetch weather data and generate all forecast signals."""
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
            signals = await self.refresh_all()
        return signals

    async def predict(self, patient_id: str | PydanticObjectId) -> dict:
        """Legacy single-patient forecast (kept for API compatibility)."""
        oid = PydanticObjectId(patient_id) if isinstance(patient_id, str) else patient_id

        signals  = await self.get_current()
        patient  = await Patient.get(oid)
        conditions = patient.conditions if patient else ""

        relevant = []
        for signal in signals:
            cond_lower = (conditions or "").lower()
            for condition, kinds in CONDITION_SIGNALS.items():
                if condition in cond_lower and signal.kind in kinds:
                    peak_day_str = (
                        signal.peak_day.isoformat()
                        if hasattr(signal.peak_day, "isoformat")
                        else str(signal.peak_day)
                    )
                    relevant.append({
                        "kind":       signal.kind,
                        "risk":       signal.risk,
                        "peak_day":   peak_day_str,
                        "confidence": signal.confidence,
                    })
                    break

        return {"signals": relevant, "generated_at": datetime.now(timezone.utc).isoformat()}

    # ── Weather Fetch — strategy selector ────────────────────────────────────

    async def _fetch_weather(self) -> Optional[dict]:
        """
        Weather source strategy:
          1. OpenWeatherMap (primary)  — if OPENWEATHER_API_KEY is set
          2. Open-Meteo   (backup)     — free, no key, always available
        """
        owm_key = settings.OPENWEATHER_API_KEY
        use_owm = owm_key and not owm_key.startswith("REPLACE")

        if use_owm:
            logger.info("[Forecaster] Trying OpenWeatherMap (primary source)...")
            data = await self._fetch_openweathermap()
            if data:
                logger.info("[Forecaster] ✅ OpenWeatherMap data received.")
                return data
            # OWM failed — log reason and switch to backup
            logger.warning(
                "[Forecaster] ⚠️  OpenWeatherMap failed (network error / bad key / rate-limit). "
                "Switching to Open-Meteo backup..."
            )
        else:
            logger.info("[Forecaster] No OWM key configured — using Open-Meteo backup directly.")

        # ── Backup: Open-Meteo (free, no key, 14-day) ────────────────────
        data = await self._fetch_open_meteo()
        if data:
            logger.info("[Forecaster] ✅ Open-Meteo backup data received (14-day forecast).")
        else:
            logger.error("[Forecaster] ❌ Both OpenWeatherMap and Open-Meteo failed!")
        return data

    # ── OpenWeatherMap (primary) ──────────────────────────────────────────────

    async def _fetch_openweathermap(self) -> Optional[dict]:
        """
        Fetches:
          - /data/2.5/forecast       → temperature, precipitation, wind (5-day, 3h intervals)
          - /data/2.5/air_pollution/forecast → PM10, PM2.5 (4-day, 1h intervals)

        Normalises into the same internal daily format used by _build_signal().
        Days beyond OWM coverage are filled with trailing averages.
        """
        key    = settings.OPENWEATHER_API_KEY
        params = {"lat": self.lat, "lon": self.lon, "appid": key, "units": "metric"}

        try:
            async with httpx.AsyncClient(timeout=12.0) as client:
                # ── 5-day forecast ────────────────────────────────────────
                fw_resp = await client.get(OWM_FORECAST_URL, params=params)
                if fw_resp.status_code != 200:
                    return None
                fw = fw_resp.json()

                # ── Air pollution forecast ────────────────────────────────
                ap_resp = await client.get(OWM_AIR_POLL_URL, params=params)
                ap = ap_resp.json() if ap_resp.status_code == 200 else {}

        except Exception:
            return None

        return self._normalize_owm(fw, ap)

    def _normalize_owm(self, forecast: dict, air_poll: dict) -> dict:
        """
        Convert OWM 3-hour list → daily aggregates in Open-Meteo compatible format.
        Fills up to 14 days by repeating the trailing day average.
        """
        # ── 3-hour → daily buckets ────────────────────────────────────────
        buckets: dict = defaultdict(lambda: {
            "temp_max": [], "temp_min": [], "precip": [], "wind": []
        })

        for item in forecast.get("list", []):
            day_key = datetime.utcfromtimestamp(item["dt"]).date()
            main    = item.get("main", {})
            wind    = item.get("wind", {})
            rain    = item.get("rain", {})

            buckets[day_key]["temp_max"].append(main.get("temp_max", main.get("temp", 30)))
            buckets[day_key]["temp_min"].append(main.get("temp_min", main.get("temp", 25)))
            buckets[day_key]["precip"].append(rain.get("3h", 0.0))
            buckets[day_key]["wind"].append(wind.get("speed", 10.0))

        sorted_days = sorted(buckets.keys())

        def _agg(days):
            temp_max  = [max(buckets[d]["temp_max"]) for d in days]
            temp_min  = [min(buckets[d]["temp_min"]) for d in days]
            precip    = [sum(buckets[d]["precip"])   for d in days]
            wind_max  = [max(buckets[d]["wind"])     for d in days]
            return temp_max, temp_min, precip, wind_max

        owm_temp_max, owm_temp_min, owm_precip, owm_wind = _agg(sorted_days)

        # ── Pad to 14 days by repeating the last known values ─────────────
        def _pad(lst, n=14):
            if not lst:
                return [0.0] * n
            return (lst + [lst[-1]] * n)[:n]

        temperature_max  = _pad(owm_temp_max)
        temperature_min  = _pad(owm_temp_min)
        precipitation    = _pad(owm_precip)
        windspeed_max    = _pad(owm_wind)

        # ── Air pollution → hourly PM10 / PM2.5 ──────────────────────────
        hourly_pm10:  List[float] = []
        hourly_pm25:  List[float] = []

        for item in air_poll.get("list", []):
            comp = item.get("components", {})
            hourly_pm10.append(float(comp.get("pm10",  0.0)))
            hourly_pm25.append(float(comp.get("pm2_5", 0.0)))

        # Pad to 14 × 24 = 336 hourly slots
        def _pad_hourly(lst, n=14 * 24):
            if not lst:
                return [40.0] * n
            return (lst + [lst[-1]] * n)[:n]

        hourly_pm10 = _pad_hourly(hourly_pm10)
        hourly_pm25 = _pad_hourly(hourly_pm25)

        return {
            "source": "openweathermap",
            "daily": {
                "temperature_2m_max":  temperature_max,
                "temperature_2m_min":  temperature_min,
                "precipitation_sum":   precipitation,
                "windspeed_10m_max":   windspeed_max,
                "uv_index_max":        [6.0] * 14,   # OWM free tier has no UV; use moderate default
            },
            "hourly": {
                "pm10":  hourly_pm10,
                "pm2_5": hourly_pm25,
            },
        }

    # ── Open-Meteo (fallback) ─────────────────────────────────────────────────

    async def _fetch_open_meteo(self) -> Optional[dict]:
        """Fetch 14-day forecast from Open-Meteo (free, no key required)."""
        params = {
            "latitude":  self.lat,
            "longitude": self.lon,
            "daily": [
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "windspeed_10m_max",
                "uv_index_max",
            ],
            "hourly":       ["pm10", "pm2_5"],
            "forecast_days": 14,
            "timezone":     "Asia/Colombo",
        }
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(OPEN_METEO_URL, params=params)
                if resp.status_code == 200:
                    data = resp.json()
                    data["source"] = "open-meteo"
                    return data
        except Exception:
            pass
        return None

    # ── Signal Builders (unchanged logic) ─────────────────────────────────────

    def _build_signal(self, kind: ForecastKind, weather: dict) -> ForecastSignal:
        daily  = weather.get("daily", {})
        hourly = weather.get("hourly", {})

        if kind == ForecastKind.HEAT:
            temps    = daily.get("temperature_2m_max", [30] * 14)
            series   = [float(t) for t in temps[:14]]
            peak_val = max(series)
            peak_idx = series.index(peak_val)
            risk     = self._heat_risk(peak_val)
            confidence = 0.85 if weather.get("source") == "openweathermap" else 0.82

        elif kind == ForecastKind.AIR_QUALITY:
            pm10_vals  = hourly.get("pm10", [])
            daily_pm10 = [
                sum(pm10_vals[i * 24:(i + 1) * 24]) / 24
                for i in range(min(14, len(pm10_vals) // 24))
            ] or [40.0] * 14
            series   = [round(v, 1) for v in daily_pm10]
            peak_val = max(series)
            peak_idx = series.index(peak_val)
            risk     = self._aqi_risk(peak_val)
            confidence = 0.80 if weather.get("source") == "openweathermap" else 0.75

        elif kind == ForecastKind.POLLEN:
            temps  = daily.get("temperature_2m_max", [30] * 14)
            winds  = daily.get("windspeed_10m_max",  [15] * 14)
            series = [
                round(min(100, (float(t) - 20) * 2 + float(w)), 1)
                for t, w in zip(temps[:14], winds[:14])
            ]
            peak_val = max(series)
            peak_idx = series.index(peak_val)
            risk     = RiskBand.MODERATE if peak_val > 50 else RiskBand.LOW
            confidence = 0.60

        elif kind == ForecastKind.FLU:
            temps  = daily.get("temperature_2m_max", [30] * 14)
            precip = daily.get("precipitation_sum",  [5]  * 14)
            series = [
                round(max(0, min(100, (35 - float(t)) * 2 + float(p))), 1)
                for t, p in zip(temps[:14], precip[:14])
            ]
            peak_val = max(series)
            peak_idx = series.index(peak_val)
            risk     = RiskBand.MODERATE if peak_val > 40 else RiskBand.LOW
            confidence = 0.55

        else:
            series   = [0.0] * 14
            peak_val = 0.0
            peak_idx = 0
            risk     = RiskBand.LOW
            confidence = 0.5

        peak_day = datetime.combine(
            date.today() + timedelta(days=peak_idx), datetime.min.time()
        )

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

    # ── Static helpers ────────────────────────────────────────────────────────

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
