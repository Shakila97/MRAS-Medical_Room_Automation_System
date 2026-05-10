from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_db
from src.models.user import User, UserRole
from src.modules.auth_service import (
    change_password,
    get_current_user,
    login_user,
    refresh_access_token,
    register_user,
    require_role,
)
from src.schemas.auth import (
    MessageResponse,
    PasswordChange,
    TokenRefresh,
    TokenResponse,
    UserLogin,
    UserRead,
    UserRegister,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ── POST /api/auth/register ───────────────────────────────────────────────────
@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user account",
)
async def register(
    data: UserRegister,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new user account.

    - Email must be unique
    - Password must be at least 8 characters and contain a number
    - Role defaults to `employee` if not specified
    """
    user = await register_user(data, db)
    return UserRead.model_validate(user)


# ── POST /api/auth/login ──────────────────────────────────────────────────────
@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Login and receive access + refresh tokens",
)
async def login(
    data: UserLogin,
    db: AsyncSession = Depends(get_db),
):
    """
    Authenticate with email and password.

    Returns:
    - `access_token`: Short-lived JWT (30 min) — send in `Authorization: Bearer <token>`
    - `refresh_token`: Long-lived JWT (7 days) — use to get a new access token
    """
    return await login_user(data.email, data.password, db)


# ── POST /api/auth/refresh ────────────────────────────────────────────────────
@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Get a new access token using a refresh token",
)
async def refresh(
    data: TokenRefresh,
    db: AsyncSession = Depends(get_db),
):
    """Issue a new access token without requiring the user to log in again."""
    return await refresh_access_token(data.refresh_token, db)


# ── GET /api/auth/me ──────────────────────────────────────────────────────────
@router.get(
    "/me",
    response_model=UserRead,
    summary="Get the currently authenticated user",
)
async def get_me(current_user: User = Depends(get_current_user)):
    """Returns the profile of the currently logged-in user."""
    return UserRead.model_validate(current_user)


# ── POST /api/auth/change-password ───────────────────────────────────────────
@router.post(
    "/change-password",
    response_model=MessageResponse,
    summary="Change the current user's password",
)
async def change_pwd(
    data: PasswordChange,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Change the currently logged-in user's password."""
    await change_password(current_user, data.current_password, data.new_password, db)
    return MessageResponse(message="Password changed successfully")


# ── GET /api/auth/admin-only ──────────────────────────────────────────────────
@router.get(
    "/admin-only",
    response_model=MessageResponse,
    summary="Example admin-only endpoint",
    include_in_schema=False,  # Hidden from public docs
)
async def admin_test(
    _: User = Depends(require_role(UserRole.ADMIN)),
):
    """Test endpoint demonstrating role restriction."""
    return MessageResponse(message="You have admin access")