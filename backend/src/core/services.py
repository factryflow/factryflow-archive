from passlib.hash import bcrypt
from sqlalchemy import select

from src.auth.models import User
from src.core.config import settings
from src.database import get_async_session


async def create_test_user(EMAIL: str = "test@test.com"):
    if settings.ENVIRONMENT != "development":
        return None

    async for session in get_async_session():
        result = await session.execute(select(User).where(User.email == EMAIL))
        user = result.scalar_one_or_none()

        if not user:
            user = User(
                email=EMAIL,
                hashed_password=bcrypt.hash("password"),
                is_active=True,
                is_superuser=True,
            )
            session.add(user)
            await session.commit()
            await session.refresh(user)

    return user
