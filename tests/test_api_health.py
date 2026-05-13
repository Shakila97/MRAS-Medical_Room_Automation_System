"""
MRAS v3.0 — Integration Tests: API Health & Auth Endpoints
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["version"] == "3.0.0"


@pytest.mark.asyncio
async def test_login_demo_doctor(client: AsyncClient):
    response = await client.post(
        "/api/auth/token",
        data={"username": "doctor@demo.mras", "password": "demo1234"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


@pytest.mark.asyncio
async def test_login_wrong_credentials(client: AsyncClient):
    response = await client.post(
        "/api/auth/token",
        data={"username": "wrong@demo.mras", "password": "wrong"},
    )
    assert response.status_code == 401
