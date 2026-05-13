"""
MRAS v3.0 — Intelligence Router (v3.0 New)
Exposes predictive forecasting, JRISSI scores, and notification endpoints.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_session
from src.core.security import require_roles
from src.modules.jrissi_scorer import JRISSIScorer
from src.modules.health_forecaster import HealthForecaster

router = APIRouter()


@router.get("/jrissi/{employee_id}", summary="Get JRISSI Mental Health Risk Score",
            dependencies=[Depends(require_roles("doctor"))])
async def get_jrissi_score(employee_id: int, session: AsyncSession = Depends(get_session)):
    scorer = JRISSIScorer(session)
    score = await scorer.compute(employee_id)
    return {"employee_id": employee_id, "mhrs": score}


@router.get("/forecast/{employee_id}", summary="Environmental disease forecast",
            dependencies=[Depends(require_roles("doctor", "employee"))])
async def get_forecast(employee_id: int, session: AsyncSession = Depends(get_session)):
    forecaster = HealthForecaster(session)
    result = await forecaster.predict(employee_id)
    return {"employee_id": employee_id, "forecast": result}


@router.get("/briefing/{employee_id}", summary="Pre-visit AI doctor briefing",
            dependencies=[Depends(require_roles("doctor"))])
async def pre_visit_briefing(employee_id: int, session: AsyncSession = Depends(get_session)):
    # TODO: call Claude API for AI briefing generation
    return {"employee_id": employee_id, "briefing": "Coming soon"}
