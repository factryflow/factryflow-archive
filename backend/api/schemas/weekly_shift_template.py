# schemas.py
from datetime import datetime, date, time
from typing import Optional
from api.models import WeeklyShiftTemplate, WeeklyShiftTemplateDetail
from ninja import Schema, ModelSchema


class WeeklyShiftTemplateIn(Schema):
    name: str


class WeeklyShiftTemplateOut(ModelSchema):
    class Config:
        model = WeeklyShiftTemplate
        model_fields = "__all__"


class WeeklyShiftTemplateDetailIn(Schema):
    day_of_week: int
    start_time: time
    end_time: time
    template_id: int


class WeeklyShiftTemplateDetailOut(ModelSchema):
    class Config:
        model = WeeklyShiftTemplateDetail
        model_fields = "__all__"
