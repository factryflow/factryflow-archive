from fastapi import APIRouter

from src.auth.schemas import UserCreate, UserRead, UserUpdate
from src.auth.service import auth_backend, fastapi_users

router = APIRouter()

router.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt")
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
)
router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
)
