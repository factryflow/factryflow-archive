# schemas.py
from datetime import datetime, date
from typing import Optional
from api.models import Tasks, TaskType, TaskStatus
from ninja import Schema, ModelSchema


class TaskIn(Schema):
    external_id: str
    name: str
    task_status_id: Optional[int] = None
    task_type_id: Optional[int] = None
    setup_time: int
    run_time_per_unit: int
    teardown_time: int
    quantity: int
    jobs_id: Optional[int] = None
    predecessors_id: Optional[list] = []
    item: Optional[str] = None
    planned_start_datetime: datetime
    planned_end_datetime: datetime


class TaskOut(ModelSchema):
    class Config:
        model = Tasks
        model_fields = "__all__"


class TaskTypeOut(ModelSchema):
    class Config:
        model = TaskType
        model_fields = "__all__"


class TaskStatusOut(ModelSchema):
    class Config:
        model = TaskStatus
        model_fields = "__all__"
