# schemas.py
from datetime import datetime
from api.models import ScheduleRun, ScheduleRunStatus
from ninja import Schema, ModelSchema

    
class ScheduleRunIn(Schema):
    """
    This schema is using for getting the input data for the ScheduleRun model.
    """
    triggered_on: datetime
    triggered_by_id: int
    schedule_status_id: int
    


class ScheduleRunOut(ModelSchema):
    """
    This schema is using for returning the output of ScheduleRun
    """
    class Config:
        model = ScheduleRun
        model_fields = "__all__"

        

class ScheduleRunStatusOut(ModelSchema):
    """
    This schema is using for returning the output of ScheduleRunStatus
    """
    class Config:
        model = ScheduleRunStatus
        model_fields = "__all__"
