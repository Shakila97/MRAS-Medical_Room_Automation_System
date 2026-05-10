from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, field_validator

from src.models.user import UserRole


# ── Request Schemas ───────────────────────────────────────────────────────────
class UserRegister(BaseModel):
    """Request body for POST /auth/register"""
    email: EmailStr
    full_name: str
    password: str
    employee_id: Optional[str] = None
    role: UserRole = UserRole.EMPLOYEE

    @field_validator("password")
    @classmethod
    def password_must_be_strong(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one number")
        return v

    @field_validator("full_name")
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Full name cannot be empty")
        return v.strip()


class UserLogin(BaseModel):
    """Request body for POST /auth/login"""
    email: EmailStr
    password: str


class TokenRefresh(BaseModel):
    """Request body for POST /auth/refresh"""
    refresh_token: str


class PasswordChange(BaseModel):
    """Request body for POST /auth/change-password"""
    current_password: str
    new_password: str

    @field_validator("new_password")
    @classmethod
    def new_password_must_be_strong(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one number")
        return v


# ── Response Schemas ─────────────────────────────────────────────────────────
class UserRead(BaseModel):
    """Safe user response — never includes hashed_password."""
    id: int
    email: str
    full_name: str
    employee_id: Optional[str]
    role: UserRole
    sensor_consent: bool
    is_active: bool
    is_verified: bool
    created_at: datetime
    last_login: Optional[datetime]

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    """Response for login and token refresh."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int       # seconds until access token expires
    user: UserRead


class MessageResponse(BaseModel):
    """Generic success message response."""
    message: str