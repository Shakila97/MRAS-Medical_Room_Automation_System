from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from src.core.config import settings

async def init_db() -> None:
    """Initialize Beanie ODM with Motor client."""
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    
    # Extract DB name from the URL, defaulting to 'mras_db'
    db_name = client.get_database().name or "mras_db"
    
    from src.models.user import User
    from src.models.patient import Patient
    from src.models import (
        Vital, Consultation, Drug, Prescription, PrescriptionLine,
        InventoryItem, GRN, GRNLot, JRISSIRecord, Appointment,
        Notification, ForecastSignal, AuditLog
    )
    
    await init_beanie(
        database=client[db_name],
        document_models=[
            User, Patient, Vital, Consultation, Drug, Prescription,
            PrescriptionLine, InventoryItem, GRN, GRNLot,
            JRISSIRecord, Appointment, Notification,
            ForecastSignal, AuditLog
        ]
    )

async def get_db():
    """
    Dummy dependency for FastAPI routes.
    Beanie manages the database connection globally, so we no longer need to yield a session.
    However, this is kept so that routes relying on `db = Depends(get_db)` don't immediately crash.
    """
    yield None

async def create_db_tables() -> None:
    """Mock for backwards compatibility. MongoDB is schemaless, handled by init_beanie."""
    pass