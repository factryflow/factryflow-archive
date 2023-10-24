# schemas.py
from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import Dependency, DependencyStatus, DependencyTypes
from api.schemas.base import DependencyBaseOut, JobBaseOut, TaskBaseOut

# Depdenency


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


class DependencyOut(DependencyBaseOut):
    jobs: List[JobBaseOut]
    tasks: List[TaskBaseOut]


# DependencyType


class DependencyTypeIn(ModelSchema):
    class Config:
        model = DependencyTypes
        model_fields = ["name"]


class DependencyTypeOut(ModelSchema):
    class Config:
        model = DependencyTypes
        model_fields = "__all__"


# DependencyStatus


class DependencyStatusOut(ModelSchema):
    class Config:
        model = DependencyStatus
        model_fields = "__all__"
