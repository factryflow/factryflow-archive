# schemas.py
from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import Dependency, Job, JobStatus, JobType


class Depdendency(ModelSchema):
    class Config:
        model = Dependency
        model_fields = ["id", "name"]


class JobStatusOut(ModelSchema):
    class Config:
        model = JobStatus
        model_fields = ["id", "name"]


class JobTypeOut(ModelSchema):
    class Config:
        model = JobType
        model_fields = ["id", "name"]


class JobIn(ModelSchema):
    job_status_id: int
    job_type_id: int
    dependency_ids: List[int] = Field(default=[])

    class Config:
        model = Job
        model_fields = ["name", "customer", "due_date", "priority", "external_id"]


class JobOut(ModelSchema):
    job_status: JobStatusOut
    job_type: JobTypeOut
    dependencies: List[Depdendency]

    class Config:
        model = Job
        model_fields = "__all__"
