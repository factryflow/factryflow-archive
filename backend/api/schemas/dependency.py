# schemas.py
from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import Dependency, DependencyStatus, DependencyTypes, Job, Task


class Job(ModelSchema):
    class Config:
        model = Job
        model_exclude = ["dependencies"]


class Task(ModelSchema):
    class Config:
        model = Task
        model_exclude = ["dependencies"]


class DependencyTypeOut(ModelSchema):
    class Config:
        model = DependencyTypes
        model_fields = ["id", "name"]


class DependencyStatusOut(ModelSchema):
    class Config:
        model = DependencyStatus
        model_fields = ["id", "name"]


class DependencyIn(ModelSchema):
    dependency_status_id: int
    dependency_type_id: int
    job_ids: List[int] = Field(default=[])
    task_ids: List[int] = Field(default=[])

    class Config:
        model = Dependency
        model_fields = [
            "name",
            "external_id",
            "expected_close_datetime",
            "actual_close_datetime",
            "notes",
        ]


class DependencyOut(ModelSchema):
    dependency_status: DependencyStatusOut
    dependency_type: DependencyTypeOut
    jobs: List[Job]
    tasks: List[Task]

    class Config:
        model = Dependency
        model_fields = "__all__"
