# schemas.py
from typing import List, Optional

from ninja import ModelSchema
from pydantic import Field

from api.models import Task, TaskStatus, TaskType


class TaskIn(ModelSchema):
    task_status_id: int
    task_type_id: int
    job_id: Optional[int] = None
    predecessor_ids: List[int] = Field(default=[], alias="predecessors_id")
    item_id: int = None

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
    task_status_id: int
    task_type_id: int
    job_id: Optional[int] = None
    predecessor_ids: List[int] = Field(default=[], alias="predecessors_id")

    class Config:
        model = Task
        model_exclude = ["task_status", "task_type", "job", "predecessors"]


class TaskTypeOut(ModelSchema):
    class Config:
        model = TaskType
        model_fields = "__all__"


class TaskStatusOut(ModelSchema):
    class Config:
        model = TaskStatus
        model_fields = "__all__"
