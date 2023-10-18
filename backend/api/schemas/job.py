# schemas.py
from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import Job
from api.schemas.base import DependencyBaseOut, JobBaseOut, TaskBaseOut


class JobIn(ModelSchema):
    """
    This schema is using for getting the input data for the Job model.
    """
    job_status_id: int
    job_type_id: int
    dependency_ids: List[int] = Field(default=[])
    task_ids: List[int] = Field(default=[])

    class Config:
        model = Job
        model_fields = ["name", "customer", "due_date", "priority", "external_id"]


class JobOut(JobBaseOut):
    tasks: List[TaskBaseOut]
    dependencies: List[DependencyBaseOut]
