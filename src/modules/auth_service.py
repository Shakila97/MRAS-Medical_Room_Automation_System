from datetime import datetime, timezone
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.core.database import get_db
from src.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from src.models.user import User, UserRole
from src.schemas.auth import TokenResponse, UserRead, UserRegister

# OAuth2 scheme — token extracted from "Authorization: Bearer <token>" header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


# ── User Queries ─────────────────────────────────────────────────────────────
async def get_user_by_email(email: str, db: AsyncSession) -> Optional[User]:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(user_id: int, db: AsyncSession) -> Optional[User]:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


# ── Auth Operations ───────────────────────────────────────────────────────────
async def register_user(data: UserRegister, db: AsyncSession) -> User:
    """
    Register a new user.

    Raises:
        HTTPException 400: If email is already taken.
    """
    existing = await get_user_by_email(data.email, db)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists",
        )

    user = User(
        email=data.email,
        full_name=data.full_name,
        employee_id=data.employee_id,
        hashed_password=hash_password(data.password),
        role=data.role,
    )
    db.add(user)
    await db.flush()   # Get the generated ID without committing yet
    await db.refresh(user)
    return user


async def login_user(email: str, password: str, db: AsyncSession) -> TokenResponse:
    """
    Authenticate user and return access + refresh tokens.

    Raises:
        HTTPException 401: If credentials are invalid or account is inactive.
    """
    user = await get_user_by_email(email, db)

    # Use the same generic error for both wrong email and wrong password
    # to prevent user enumeration attacks
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="This account has been deactivated. Contact your administrator.",
        )

    # Update last login timestamp
    user.last_login = datetime.now(timezone.utc)
    db.add(user)

    token_payload = {"sub": str(user.id), "role": user.role, "email": user.email}

    return TokenResponse(
        access_token=create_access_token(token_payload),
        refresh_token=create_refresh_token({"sub": str(user.id)}),
        expires_in=30 * 60,  # 30 minutes in seconds
        user=UserRead.model_validate(user),
    )


async def refresh_access_token(refresh_token: str, db: AsyncSession) -> TokenResponse:
    """
    Issue a new access token from a valid refresh token.

    Raises:
        HTTPException 401: If refresh token is invalid or expired.
    """
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(refresh_token)
        if payload.get("type") != "refresh":
            raise credentials_error
        user_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError):
        raise credentials_error

    user = await get_user_by_id(user_id, db)
    if not user or not user.is_active:
        raise credentials_error

    token_payload = {"sub": str(user.id), "role": user.role, "email": user.email}

    return TokenResponse(
        access_token=create_access_token(token_payload),
        refresh_token=create_refresh_token({"sub": str(user.id)}),
        expires_in=30 * 60,
        user=UserRead.model_validate(user),
    )


async def change_password(
    user: User, current_password: str, new_password: str, db: AsyncSession
) -> None:
    """
    Change a user's password after verifying the current one.

    Raises:
        HTTPException 400: If current password is incorrect.
    """
    if not verify_password(current_password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )
    user.hashed_password = hash_password(new_password)
    user.updated_at = datetime.now(timezone.utc)
    db.add(user)


# ── Auth Dependencies ─────────────────────────────────────────────────────────
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    FastAPI dependency — extracts and validates JWT, returns the current user.

    Usage:
        async def my_endpoint(user: User = Depends(get_current_user)):
            ...
    """
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(token)
        if payload.get("type") != "access":
            raise credentials_error
        user_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError):
        raise credentials_error

    user = await get_user_by_id(user_id, db)
    if not user or not user.is_active:
        raise credentials_error

    return user


def require_role(*roles: UserRole):
    """
    FastAPI dependency factory — restricts endpoint to specific roles.

    Usage:
        async def doctor_only(user = Depends(require_role(UserRole.DOCTOR))):
            ...

        async def multi_role(user = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN))):
            ...
    """
    async def checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role(s): {', '.join(r.value for r in roles)}",
            )
        return current_user
    return checker