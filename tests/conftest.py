import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlmodel import SQLModel

from src.main import app
from src.core.database import get_db
from src.modules.user import User, UserRole
from src.core.security import hash_password

# ── In-memory SQLite for tests (no real DB needed) ────────────────────────────
TEST_DATABASE_URL = "sqlite+aiosqlite:///./test.db"

test_engine = create_async_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

TestSessionLocal = async_sessionmaker(
    bind=test_engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


@pytest_asyncio.fixture(scope="function", autouse=True)
async def setup_test_db():
    """Create fresh tables before each test, drop after."""
    async with test_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)


@pytest_asyncio.fixture
async def db() -> AsyncSession:
    """Yield a test database session."""
    async with TestSessionLocal() as session:
        yield session


@pytest_asyncio.fixture
async def client(db: AsyncSession) -> AsyncClient:
    """Yield an async HTTP test client wired to the test DB."""
    async def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as ac:
        yield ac

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def sample_employee(db: AsyncSession) -> User:
    """A pre-created employee user for use in tests."""
    user = User(
        email="employee@test.mras",
        full_name="Test Employee",
        employee_id="SIS/24/B2/99",
        hashed_password=hash_password("password123"),
        role=UserRole.EMPLOYEE,
        is_active=True,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@pytest_asyncio.fixture
async def sample_doctor(db: AsyncSession) -> User:
    """A pre-created doctor user for use in tests."""
    user = User(
        email="doctor@test.mras",
        full_name="Dr. Test Doctor",
        hashed_password=hash_password("password123"),
        role=UserRole.DOCTOR,
        is_active=True,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@pytest_asyncio.fixture
async def employee_token(client: AsyncClient, sample_employee: User) -> str:
    """Login as employee and return the access token."""
    resp = await client.post("/api/auth/login", json={
        "email": "employee@test.mras",
        "password": "password123",
    })
    return resp.json()["access_token"]


@pytest_asyncio.fixture
async def doctor_token(client: AsyncClient, sample_doctor: User) -> str:
    """Login as doctor and return the access token."""
    resp = await client.post("/api/auth/login", json={
        "email": "doctor@test.mras",
        "password": "password123",
    })
    return resp.json()["access_token"]