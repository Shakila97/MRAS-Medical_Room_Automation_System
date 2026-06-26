import asyncio
from src.core.database import AsyncSessionLocal, engine, create_db_tables
from src.models.user import User, UserRole
from src.core.security import hash_password

async def seed():
    # Ensure tables exist
    await create_db_tables()
    
    async with AsyncSessionLocal() as session:
        # Check if users already exist
        from sqlmodel import select
        result = await session.execute(select(User))
        existing = result.scalars().all()
        if existing:
            print(f"Database already contains {len(existing)} users. Skipping seed.")
            return

        print("Seeding default users...")
        users = [
            User(
                email="admin@mras.com",
                full_name="System Admin",
                employee_id="ADM-001",
                role=UserRole.ADMIN,
                hashed_password=hash_password("admin123"),
                is_active=True
            ),
            User(
                email="doctor@mras.com",
                full_name="Dr. Withana",
                employee_id="DOC-001",
                role=UserRole.DOCTOR,
                hashed_password=hash_password("doctor123"),
                is_active=True
            ),
            User(
                email="pharmacy@mras.com",
                full_name="L. Koralage",
                employee_id="PHA-001",
                role=UserRole.PHARMACY_STAFF,
                hashed_password=hash_password("pharmacy123"),
                is_active=True
            ),
            User(
                email="employee@mras.com",
                full_name="John Doe",
                employee_id="EMP-001",
                role=UserRole.EMPLOYEE,
                hashed_password=hash_password("employee123"),
                is_active=True
            )
        ]
        
        for u in users:
            session.add(u)
            
        await session.commit()
        print("Successfully seeded 4 role-based users.")

if __name__ == "__main__":
    asyncio.run(seed())
