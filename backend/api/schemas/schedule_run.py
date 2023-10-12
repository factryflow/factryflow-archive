# schemas.py
from datetime import datetime, date
from typing import Optional
from api.models import ScheduleRun, ScheduleRunStatus
from ninja import Schema, ModelSchema


class ScheduleRunIn(Schema):
    triggered_on: datetime
    triggered_by_id: int
    schedule_status_id: int


class ScheduleRunOut(ModelSchema):
    class Config:
        model = ScheduleRun
        model_fields = "__all__"


class ScheduleRunStatusOut(ModelSchema):
    class Config:
        model = ScheduleRunStatus
        model_fields = "__all__"
