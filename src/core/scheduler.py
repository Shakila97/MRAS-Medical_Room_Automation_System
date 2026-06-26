"""
MRAS v3.0 — APScheduler Configuration
Background cron jobs for JRISSI, Forecasting, and Expiry Alerts.
"""
import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from src.core.database import AsyncSessionLocal
from src.modules.health_forecaster import HealthForecaster
from src.modules.jrissi_scorer import JRISSIScorer
from src.modules.inventory_service import get_expiring
from src.models import Notification, NotificationKind, NotificationTone
from sqlmodel import select
from src.models import Patient

logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler(timezone="Asia/Colombo")


async def refresh_forecasts_job():
    """Daily at 02:00: Refresh 14-day forecasts from Open-Meteo."""
    logger.info("Running job: refresh_forecasts")
    async with AsyncSessionLocal() as session:
        forecaster = HealthForecaster(session)
        await forecaster.refresh_all()
        await session.commit()
    logger.info("Finished job: refresh_forecasts")


async def compute_jrissi_batch_job():
    """Daily at 06:00: Recompute JRISSI for all active patients."""
    logger.info("Running job: compute_jrissi_batch")
    async with AsyncSessionLocal() as session:
        scorer = JRISSIScorer(session)
        result = await session.execute(select(Patient).where(Patient.is_active == True))
        patients = result.scalars().all()
        for patient in patients:
            await scorer.compute(patient.id)
        await session.commit()
    logger.info("Finished job: compute_jrissi_batch")


async def expiry_alerts_job():
    """Daily at 07:00: Notify pharmacy of items expiring within 30 days."""
    logger.info("Running job: expiry_alerts")
    async with AsyncSessionLocal() as session:
        expiring_lots = await get_expiring(session, days=30)
        if expiring_lots:
            # Group by drug
            count = len(set(lot.drug_name for lot in expiring_lots))
            
            notif = Notification(
                kind=NotificationKind.STOCK_LOW,
                tone=NotificationTone.WARNING,
                title="Expiry Watch Alert",
                body=f"There are {len(expiring_lots)} lots across {count} drugs expiring within the next 30 days. Please review FEFO queue.",
                target_role='["pharmacy", "admin"]',
                cta_label="View Inventory",
                cta_url="/pharmacy/inventory?filter=expiring",
            )
            session.add(notif)
            await session.commit()
    logger.info("Finished job: expiry_alerts")


def start_scheduler():
    """Register all cron jobs and start the scheduler."""
    scheduler.add_job(
        refresh_forecasts_job,
        CronTrigger(hour=2, minute=0),
        id="refresh_forecasts",
        replace_existing=True,
    )
    
    scheduler.add_job(
        compute_jrissi_batch_job,
        CronTrigger(hour=6, minute=0),
        id="compute_jrissi_batch",
        replace_existing=True,
    )

    scheduler.add_job(
        expiry_alerts_job,
        CronTrigger(hour=7, minute=0),
        id="expiry_alerts",
        replace_existing=True,
    )

    scheduler.start()
    logger.info("APScheduler started with 3 cron jobs.")

def shutdown_scheduler():
    """Gracefully shutdown the scheduler."""
    scheduler.shutdown()
    logger.info("APScheduler shut down.")
