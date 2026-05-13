"""
MRAS v3.0 — Unit Tests: Health Forecaster
"""

import pytest
from unittest.mock import AsyncMock, patch

from src.modules.health_forecaster import HealthForecaster


@pytest.fixture
def forecaster():
    session = AsyncMock()
    f = HealthForecaster(session)
    f.fusion.get_fused_features = AsyncMock(return_value={
        "avg_systolic_90d": 130.0,
        "bmi": 27.0,
        "avg_daily_steps_7d": 5000,
        "temp_c": 34.0,
        "humidity_pct": 88.0,
    })
    return f


@pytest.mark.asyncio
async def test_predict_returns_expected_keys(forecaster):
    result = await forecaster.predict(employee_id=1)
    assert "episode_probability" in result
    assert "alert_triggered" in result
    assert "forecast_horizon_days" in result


@pytest.mark.asyncio
async def test_forecast_horizon_is_14_days(forecaster):
    result = await forecaster.predict(employee_id=1)
    assert result["forecast_horizon_days"] == 14
