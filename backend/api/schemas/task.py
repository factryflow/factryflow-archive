# schemas.py
from datetime import datetime
from typing import Optional
from api.models import Tasks, TaskType, TaskStatus
from ninja import Schema, ModelSchema

    
class TaskIn(Schema):
    """
    This schema is using for getting the input data for the Tasks model.
    """
    external_id: str
    name: str
    task_status_id: Optional[int] = None
    task_type_id: Optional[int] = None
    setup_time: int
    run_time_per_unit: int
    teardown_time: int
    quantity: int
    jobs_id: Optional[int] = None
    predecessors_id:  Optional[list] = []
    item: Optional[str] = None
    planned_start_datetime: datetime
    planned_end_datetime: datetime
    


class TaskOut(ModelSchema):
    """
    This schema is using for returning the output of the Tasks
    """
    class Config:
        model = Tasks
        model_fields = "__all__"


class TaskTypeOut(ModelSchema):
    """
    This schema is using for returning the output of the TaskType
    """
    class Config:
        model = TaskType
        model_fields = "__all__"
        

class TaskStatusOut(ModelSchema):
    """
    This schema is using for returning the output of the TaskStatus
    """
    class Config:
        model = TaskStatus
        model_fields = "__all__"
