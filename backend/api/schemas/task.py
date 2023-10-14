# schemas.py
from typing import List, Optional

from ninja import ModelSchema
from pydantic import Field

from api.models import Task, TaskStatus, TaskType


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
    job_id: Optional[int] = None
    predecessors: List[Predecessor]

    class Config:
        model = Task
        model_exclude = ["job"]
