# schemas.py
from typing import List, Optional

from ninja import ModelSchema
from pydantic import Field

from api.models import Task
from api.schemas.base import DependencyBaseOut, TaskBaseOut
from api.utils.generate_custom_schema import generate_custom_field_schema


class TaskIn(ModelSchema):
    task_status_id: int
    task_type_id: int
    job_id: int = None
    work_center_id: int = Field(None, example=1)
    item_id: int = None
    predecessor_ids: List[int] = Field(default=[])
    successor_ids: List[int] = Field(default=[])
    dependency_ids: List[int] = Field(default=[])
    custom_fields: Optional[generate_custom_field_schema(model_name= 'Task', class_suffix= 'Task')]

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
    predecessors: List[TaskBaseOut]
    successors: List[TaskBaseOut]
    dependencies: List[DependencyBaseOut]

    class Config:
        model = Task
        model_fields = "__all__"
