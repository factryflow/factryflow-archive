from typing import AsyncGenerator

from sqlalchemy import MetaData
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from src.constants import DB_NAMING_CONVENTION
from src.core.config import settings
from src.core.models import Base

DATABASE_URL = settings.DATABASE_URL

# Create a SQLAlchemy async engine.
engine = create_async_engine(DATABASE_URL)

# Create a SQLAlchemy metadata object.
metadata = MetaData(naming_convention=DB_NAMING_CONVENTION)

# Create a SQLAlchemy async session factory.
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def create_db_and_tables():
    """Create database and tables."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """Dependency to get a SQLAlchemy async session."""
    async with async_session_maker() as session:
        yield session
