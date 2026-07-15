import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from src.core.config import settings

async def check_users():
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    db = client.get_database().name or 'mras_db'
    collection = client[db]['User']
    users = await collection.find({}).to_list(None)
    for u in users:
        print(f"Found user: {u.get('email')} - {u.get('role')}")
    if not users:
        print("No users found in MongoDB.")

if __name__ == "__main__":
    asyncio.run(check_users())
