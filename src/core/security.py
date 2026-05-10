"""
MRAS v3.0 — Security Utilities

Provides JWT token creation/decoding and bcrypt password hashing.
All crypto parameters are loaded from the central Settings object.
"""

from datetime import datetime, timedelta, timezone
from typing import Any

from jose import jwt
from passlib.context import CryptContext

from src.core.config import settings

# ── Password Hashing ──────────────────────────────────────────────────────────
_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain: str) -> str:
    """Return the bcrypt hash of *plain*."""
    return _pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    """Return True if *plain* matches the stored *hashed* password."""
    return _pwd_context.verify(plain, hashed)


# ── JWT Helpers ───────────────────────────────────────────────────────────────

def _create_token(payload: dict[str, Any], expires_delta: timedelta, token_type: str) -> str:
    """Internal helper — stamps expiry and type into *payload* then encodes it."""
    data = payload.copy()
    data["type"] = token_type
    data["exp"] = datetime.now(timezone.utc) + expires_delta
    return jwt.encode(data, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_access_token(payload: dict[str, Any]) -> str:
    """Return a short-lived access JWT (default: 30 min)."""
    return _create_token(
        payload,
        timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        token_type="access",
    )


def create_refresh_token(payload: dict[str, Any]) -> str:
    """Return a long-lived refresh JWT (default: 7 days)."""
    return _create_token(
        payload,
        timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        token_type="refresh",
    )


def decode_token(token: str) -> dict[str, Any]:
    """
    Decode and verify a JWT.

    Raises:
        jose.JWTError: If the token is invalid or expired.
    """
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])