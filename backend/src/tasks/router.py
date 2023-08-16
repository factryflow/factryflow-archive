from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.auth.dependencies import current_active_user
from src.database import get_async_session
from src.tasks.models import Task
from src.tasks.schemas import (
    TaskCreate,
    TaskCreatedResponse,
    TaskDeletedResponse,
    TaskRead,
)

router = APIRouter(dependencies=[Depends(current_active_user)])


@router.post(
    "/",
    response_model=TaskCreatedResponse,
    status_code=status.HTTP_201_CREATED,
    description="Creates a new task",
    summary="Create task",
    responses={
        status.HTTP_201_CREATED: {
            "model": TaskCreatedResponse,
            "description": "Task successfully created",
        },
    },
)
async def create_task(
    task: TaskCreate, session: AsyncSession = Depends(get_async_session)
):
    db_task = Task(**task.dict())
    session.add(db_task)
    await session.commit()
    await session.refresh(db_task)
    return {"message": "Task created successfully", "task": db_task}


@router.get(
    "/{task_id}",
    response_model=TaskRead,
    status_code=status.HTTP_200_OK,
    description="Fetch a task by its ID",
    summary="Read task",
)
async def read_task(task_id: int, session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Task).where(Task.id == task_id))
    task = result.scalars().first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.patch(
    "/{task_id}",
    response_model=TaskRead,
    status_code=status.HTTP_200_OK,
    description="Updates a task by its ID",
    summary="Update task",
)
async def update_task(
    task_id: int, task: TaskCreate, session: AsyncSession = Depends(get_async_session)
):
    result = await session.execute(select(Task).where(Task.id == task_id))
    db_task = result.scalars().first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.name = task.name
    db_task.job_id = task.job_id
    await session.commit()
    await session.refresh(db_task)
    return db_task


@router.delete(
    "/{task_id}",
    response_model=TaskDeletedResponse,
    status_code=status.HTTP_200_OK,
    description="Deletes a task by its ID",
    summary="Delete task",
)
async def delete_task(task_id: int, session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Task).where(Task.id == task_id))
    db_task = result.scalars().first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(db_task)
    await session.commit()
    return {"message": "Task deleted successfully"}
