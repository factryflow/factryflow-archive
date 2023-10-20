# schemas.py
from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import Job
from api.schemas.base import DependencyBaseOut, JobBaseOut, TaskBaseOut


class JobIn(ModelSchema):
    job_status_id: int
    job_type_id: int
    dependency_ids: List[int] = Field(default=[])
    task_ids: List[int] = Field(default=[])
    order: int = Field(..., alias="priority")

    class Config:
        model = Job
        model_fields = ["name", "customer", "due_date", "external_id"]


class JobOut(JobBaseOut):
    tasks: List[TaskBaseOut]
    dependencies: List[DependencyBaseOut]
