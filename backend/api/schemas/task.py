# schemas.py
from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import Dependency, Job, Task, TaskStatus, TaskType


class Depdendency(ModelSchema):
    class Config:
        model = Dependency
        model_fields = ["id", "name"]


class Job(ModelSchema):
    class Config:
        model = Job
        model_fields = ["id", "name"]


class TaskTypeOut(ModelSchema):
    class Config:
        model = TaskType
        model_fields = ["id", "name"]


class TaskStatusOut(ModelSchema):
    class Config:
        model = TaskStatus
        model_fields = ["id", "name"]


class Predecessor(ModelSchema):
    task_status: TaskStatusOut
    task_type: TaskTypeOut

    class Config:
        model = Task
        model_exclude = ["predecessors"]


class TaskIn(ModelSchema):
    task_status_id: int
    task_type_id: int
    job_id: int = None
    item_id: int = None
    predecessor_ids: List[int] = Field(default=[])
    dependency_ids: List[int] = Field(default=[])

    class Config:
        model = Task
        model_fields = [
            "name",
            "external_id",
            "setup_time",
            "run_time_per_unit",
            "teardown_time",
            "quantity",
        ]


class TaskOut(ModelSchema):
    task_status: TaskStatusOut
    task_type: TaskTypeOut
    job: Job
    predecessors: List[Predecessor]
    dependencies: List[Depdendency]

    class Config:
        model = Task
        model_fields = "__all__"
