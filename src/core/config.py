"""
MRAS v3.0 — Application Configuration
Reads all environment variables from .env via Pydantic BaseSettings.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/mras_db"

    # Security
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # External APIs
    ANTHROPIC_API_KEY: str = ""
    OPENWEATHER_API_KEY: str = ""
    TOMORROWIO_API_KEY: str = ""
    TWILIO_ACCOUNT_SID: str = ""
    TWILIO_AUTH_TOKEN: str = ""
    SENDGRID_API_KEY: str = ""

    # Frontend
    FRONTEND_URL: str = "http://localhost:3000"


settings = Settings()
