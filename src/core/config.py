from pydantic_settings import BaseSettings
from pydantic import field_validator
from functools import lru_cache


class Settings(BaseSettings):
    # ── App ─────────────────────────────────────────────────────
    APP_ENV: str = "development"
    FRONTEND_URL: str = "http://localhost:5173"

    # ── Database ─────────────────────────────────────────────────
    # MongoDB Cluster URL — must be set in .env
    DATABASE_URL: str = ""

    # ── Security ─────────────────────────────────────────────────
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── Anthropic Claude (AI briefing) ────────────────────────────
    ANTHROPIC_API_KEY: str = ""
    CLAUDE_MODEL: str = "claude-opus-4-5"

    # ── Notifications ─────────────────────────────────────────────
    TWILIO_ACCOUNT_SID: str = ""
    TWILIO_AUTH_TOKEN: str = ""
    SENDGRID_API_KEY: str = ""

    # ── Climate APIs ──────────────────────────────────────────────
    OPENWEATHER_API_KEY: str = ""
    OPENWEATHER_LAT: float = 6.9271   # Default: Colombo, Sri Lanka
    OPENWEATHER_LON: float = 79.8612

    # ── Feature Flags ─────────────────────────────────────────────
    ENABLE_ML_PREDICTIONS: bool = True
    ENABLE_AI_BRIEFING: bool = True
    ENABLE_NOTIFICATIONS: bool = True

    # ── JRISSI Weights ────────────────────────────────────────────
    JRISSI_W_MENTAL_HISTORY: float = 0.25
    JRISSI_W_SLEEP: float = 0.20
    JRISSI_W_EXERCISE: float = 0.15
    JRISSI_W_VITALS_ANOMALY: float = 0.20
    JRISSI_W_CONSULT_FREQ: float = 0.10
    JRISSI_W_MEDICATION: float = 0.10
    JRISSI_ESCALATION_THRESHOLD: int = 67
    JRISSI_ESCALATION_SUSTAINED_DAYS: int = 14

    @field_validator("SECRET_KEY")
    @classmethod
    def secret_key_must_be_strong(cls, v: str) -> str:
        if v == "dev-secret-key-change-in-production":
            import os
            if os.getenv("APP_ENV", "development") == "production":
                raise ValueError("SECRET_KEY must be set in production")
        return v

    model_config = {"env_file": ".env", "extra": "ignore"}


@lru_cache
def get_settings() -> Settings:
    """Cached settings instance — reads .env once at startup."""
    return Settings()


settings = get_settings()