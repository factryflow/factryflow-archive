from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.auth.dependencies import current_active_user
from src.database import get_async_session
from src.jobs.models import Job
from src.jobs.schemas import JobCreate, JobRead

router = APIRouter(dependencies=[Depends(current_active_user)])


@router.post(
    "/",
    response_model=JobRead,
    status_code=status.HTTP_201_CREATED,
    description="Creates a new job",
    summary="Create job",
    responses={
        status.HTTP_201_CREATED: {
            "model": JobRead,
            "description": "Job successfully created",
        },
    },
)
async def create_job(
    job: JobCreate, session: AsyncSession = Depends(get_async_session)
):
    db_job = Job(**job.dict())
    session.add(db_job)
    await session.commit()
    await session.refresh(db_job)
    return db_job


@router.get(
    "/{job_id}",
    response_model=JobRead,
    status_code=status.HTTP_200_OK,
    description="Fetch a job by its ID",
    summary="Read job",
)
async def read_job(job_id: int, session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Job).where(Job.id == job_id))
    job = result.scalars().first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.patch(
    "/{job_id}",
    response_model=JobRead,
    status_code=status.HTTP_200_OK,
    description="Updates a job by its ID",
    summary="Update job",
)
async def update_job(
    job_id: int, job: JobCreate, session: AsyncSession = Depends(get_async_session)
):
    result = await session.execute(select(Job).where(Job.id == job_id))
    db_job = result.scalars().first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    db_job.name = job.name
    await session.commit()
    await session.refresh(db_job)
    return db_job


@router.delete(
    "/{job_id}",
    response_model=JobRead,
    status_code=status.HTTP_200_OK,
    description="Deletes a job by its ID",
    summary="Delete job",
)
async def delete_job(job_id: int, session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Job).where(Job.id == job_id))
    db_job = result.scalars().first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    session.delete(db_job)
    await session.commit()
    return db_job
