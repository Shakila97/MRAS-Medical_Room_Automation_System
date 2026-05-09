"""
MRAS v3.0 — Auth Router
Handles login, token refresh, and user registration.
"""

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_session
from src.modules.auth_service import AuthService

router = APIRouter()


@router.post("/token", summary="Obtain JWT access token")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session),
):
    service = AuthService(session)
    return await service.authenticate(form_data.username, form_data.password)


@router.post("/register", summary="Register a new user (admin only)")
async def register(session: AsyncSession = Depends(get_session)):
    # TODO: implement registration logic
    return {"message": "Register endpoint — coming soon"}
