"""
MRAS v3.0 — App Factory
Registers all FastAPI routers and configures middleware.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings
from src.api import auth, patients, consultations, inventory, intelligence


def create_app() -> FastAPI:
    app = FastAPI(
        title="MRAS v3.0 — Intelligent Predictive Health Platform",
        version="3.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # --- CORS ---
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.FRONTEND_URL],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # --- Routers ---
    app.include_router(auth.router,           prefix="/api/auth",           tags=["Auth"])
    app.include_router(patients.router,       prefix="/api/patients",       tags=["Patients"])
    app.include_router(consultations.router,  prefix="/api/consultations",  tags=["Consultations"])
    app.include_router(inventory.router,      prefix="/api/inventory",      tags=["Inventory"])
    app.include_router(intelligence.router,   prefix="/api/intelligence",   tags=["Intelligence v3.0"])

    @app.get("/health", tags=["Health"])
    async def health_check():
        return {"status": "ok", "version": "3.0.0"}

    return app


app = create_app()
