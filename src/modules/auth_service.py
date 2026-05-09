"""
MRAS v3.0 — Auth Service
Handles user authentication, password verification, and token issuance.
"""

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from src.core.security import verify_password, create_access_token


class AuthService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def authenticate(self, email: str, password: str) -> dict:
        """
        Validate credentials and return a JWT access token.
        TODO: query the User model from the database.
        """
        # Placeholder — replace with real DB lookup
        if email == "doctor@demo.mras" and password == "demo1234":
            token = create_access_token({"sub": email, "role": "doctor"})
            return {"access_token": token, "token_type": "bearer"}

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
