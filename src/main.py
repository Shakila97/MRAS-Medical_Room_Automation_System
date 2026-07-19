from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from src.core.config import settings
from src.core.database import init_db

# ── Routers ───────────────────────────────────────────────────────────────────
from src.api.auth import router as auth_router
from src.api.patients import router as patients_router
from src.api.consultations import router as consultations_router
from src.api.prescriptions import router as prescriptions_router
from src.api.inventory import router as inventory_router
from src.api.intelligence import router as intelligence_router
from src.api.admin import router as admin_router
from src.api.notifications import router as notifications_router
from src.api.wellness import router as wellness_router
from src.api.dashboard import router as dashboard_router
from src.core.scheduler import start_scheduler, shutdown_scheduler


# ── Lifespan (startup / shutdown) ─────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Runs on startup and shutdown.
    - Startup: initialize MongoDB Beanie ODM
    - Shutdown: nothing needed
    """
    await init_db()
    
    start_scheduler()
    yield
    shutdown_scheduler()


# ── App Factory ───────────────────────────────────────────────────────────────
def create_app() -> FastAPI:
    app = FastAPI(
        title="MRAS v3.0 — Medical Room Automation System",
        description=(
            "Intelligent Predictive Health Platform for corporate medical facilities. "
            "Built by Group 03 — University of Vocational Technology, 2026."
        ),
        version="3.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # ── Middleware ────────────────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.FRONTEND_URL],  # Never use ["*"] in production
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
        allow_headers=["Authorization", "Content-Type"],
    )

    if settings.APP_ENV == "production":
        app.add_middleware(
            TrustedHostMiddleware,
            allowed_hosts=["your-production-domain.com"],
        )

    # ── Routers ───────────────────────────────────────────────────────────────
    app.include_router(auth_router, prefix="/api")
    app.include_router(patients_router, prefix="/api")
    app.include_router(consultations_router, prefix="/api")
    app.include_router(prescriptions_router, prefix="/api")
    app.include_router(inventory_router, prefix="/api")
    app.include_router(intelligence_router, prefix="/api")
    app.include_router(admin_router, prefix="/api")
    app.include_router(notifications_router, prefix="/api")
    app.include_router(wellness_router, prefix="/api")
    app.include_router(dashboard_router, prefix="/api")

    # ── Health Check ──────────────────────────────────────────────────────────
    @app.get("/health", tags=["System"], summary="Health check")
    async def health_check():
        return {
            "status": "healthy",
            "version": "3.0.0",
            "environment": settings.APP_ENV,
        }

    return app


app = create_app()