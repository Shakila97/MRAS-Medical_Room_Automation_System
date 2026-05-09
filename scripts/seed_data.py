"""
MRAS v3.0 — Data Seeder
Loads all public datasets into the database.

Usage:
    docker compose exec backend python scripts/seed_data.py

Datasets expected in data/:
    heart_disease_uci.csv
    diabetes_130_hospitals.csv
    drug_reviews_druglib.csv
    who_essential_medicines.csv
    osmi_mental_health.csv
    kaggle_healthcare.csv
    moh_lk_health_stats.csv
"""

import asyncio
import pandas as pd
from pathlib import Path
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import AsyncSessionLocal

DATA_DIR = Path(__file__).parent.parent / "data"


async def seed_inventory(session: AsyncSession) -> None:
    """Load WHO Essential Medicines into inventory."""
    csv_path = DATA_DIR / "who_essential_medicines.csv"
    if not csv_path.exists():
        print(f"⚠️  Skipping inventory seed — {csv_path} not found.")
        return

    df = pd.read_csv(csv_path)
    print(f"✅  Loaded {len(df)} medicines from WHO dataset.")
    # TODO: bulk-insert into InventoryItem model


async def seed_patients(session: AsyncSession) -> None:
    """Load Kaggle Healthcare dataset as demo patients."""
    csv_path = DATA_DIR / "kaggle_healthcare.csv"
    if not csv_path.exists():
        print(f"⚠️  Skipping patients seed — {csv_path} not found.")
        return

    df = pd.read_csv(csv_path)
    print(f"✅  Loaded {len(df)} patients from Kaggle dataset.")
    # TODO: bulk-insert into Patient model


async def main() -> None:
    print("🌱  Starting MRAS v3.0 data seeder…")
    async with AsyncSessionLocal() as session:
        await seed_inventory(session)
        await seed_patients(session)
        await session.commit()
    print("🎉  Seeding complete.")


if __name__ == "__main__":
    asyncio.run(main())
