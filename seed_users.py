import asyncio
from src.core.config import settings
from src.core.database import init_db
from src.models.user import User, UserRole
from src.modules.auth_service import hash_password
from motor.motor_asyncio import AsyncIOMotorClient

async def seed_users():
    await init_db()
    
    users = [
        {
            "full_name": "System Admin",
            "email": "admin@mras.com",
            "password": "admin123",
            "role": UserRole.ADMIN,
            "employee_id": "ADM-001"
        },
        {
            "full_name": "Doctor",
            "email": "doctor@mras.com",
            "password": "doctor123",
            "role": UserRole.DOCTOR,
            "employee_id": "DOC-001"
        },
        {
            "full_name": "Pharmacy Staff",
            "email": "pharmacy@mras.com",
            "password": "pharmacy123",
            "role": UserRole.PHARMACY,
            "employee_id": "PHA-001"
        },
        {
            "full_name": "Employee (Patient)",
            "email": "employee@mras.com",
            "password": "employee123",
            "role": UserRole.EMPLOYEE,
            "employee_id": "EMP-001"
        }
    ]
    
    for u in users:
        existing = await User.find_one(User.email == u["email"])
        if not existing:
            user = User(
                email=u["email"],
                full_name=u["full_name"],
                employee_id=u["employee_id"],
                role=u["role"],
                hashed_password=hash_password(u["password"]),
                is_active=True
            )
            await user.insert()
            print(f"Created user: {u['email']}")
        else:
            print(f"User already exists: {u['email']}")

if __name__ == "__main__":
    asyncio.run(seed_users())
