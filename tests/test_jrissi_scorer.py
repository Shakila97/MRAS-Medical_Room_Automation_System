"""
MRAS v3.0 — Unit Tests: JRISSI Scorer
Tests the MHRS formula, risk-band classification, and sub-score boundaries.
"""

import pytest
from unittest.mock import AsyncMock, MagicMock

from src.modules.jrissi_scorer import JRISSIScorer


@pytest.fixture
def scorer():
    session = AsyncMock()
    s = JRISSIScorer(session)
    # Override sub-score methods to return controlled values
    s._job_intensity = AsyncMock(return_value=80.0)
    s._social_support = AsyncMock(return_value=20.0)
    s._physical_health_trend = AsyncMock(return_value=70.0)
    s._consultation_pattern = AsyncMock(return_value=60.0)
    return s


@pytest.mark.asyncio
async def test_mhrs_calculation(scorer):
    result = await scorer.compute(employee_id=1)
    # MHRS = 0.35*80 + 0.25*(100-20) + 0.25*70 + 0.15*60
    # = 28 + 20 + 17.5 + 9 = 74.5
    assert result["mhrs"] == pytest.approx(74.5, rel=1e-3)


@pytest.mark.asyncio
async def test_risk_band_high(scorer):
    result = await scorer.compute(employee_id=1)
    assert result["risk_band"] == "High"


@pytest.mark.parametrize("score,expected_band", [
    (10.0, "Low"),
    (45.0, "Moderate"),
    (70.0, "High"),
    (85.0, "Critical"),
])
def test_risk_band_classification(score, expected_band):
    scorer = JRISSIScorer(AsyncMock())
    assert scorer._risk_band(score) == expected_band


@pytest.mark.asyncio
async def test_sub_scores_returned(scorer):
    result = await scorer.compute(employee_id=1)
    assert "sub_scores" in result
    assert set(result["sub_scores"].keys()) == {"JII", "SSI", "PHT", "CPI"}
