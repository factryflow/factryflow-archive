from fastapi import Depends, FastAPI
from src.auth.dependencies import current_active_user
from src.auth.models import User
from src.auth.router import router as auth_router
from src.database import create_db_and_tables
from src.jobs.router import router as job_router
from src.tasks.router import router as task_router

app = FastAPI(
    # title=settings.project_name,
    # version=settings.version,
    # openapi_url=f"{settings.api_v1_prefix}/openapi.json",
    # debug=settings.debug,
)
app.include_router(auth_router, tags=["auth"])

app.include_router(task_router, prefix="/tasks", tags=["tasks"])

app.include_router(job_router, prefix="/jobs", tags=["jobs"])


@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


@app.on_event("startup")
async def on_startup():
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()
