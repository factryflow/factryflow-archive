# schemas.py
from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import Task
from api.schemas.base import DependencyBaseOut, TaskBaseOut


class Predecessor(TaskBaseOut):
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


class TaskOut(TaskBaseOut):
    predecessors: List[Predecessor]
    dependencies: List[DependencyBaseOut]

    class Config:
        model = Task
        model_fields = "__all__"
