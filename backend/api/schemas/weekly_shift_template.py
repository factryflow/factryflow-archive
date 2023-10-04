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
        model_fields = ["id", "name", "created_at", "created_by", "updated_at", "updated_by", "is_active", "is_deleted"]
        
        
class WeeklyShiftTemplateDetailIn(Schema):
    day_of_week: int
    start_time: time
    end_time: time
    


class WeeklyShiftTemplateDetailOut(ModelSchema):
    class Config:
        model = WeeklyShiftTemplateDetail
        model_fields = ["id","template", "day_of_week", "start_time", "end_time", "created_at", "created_by", "updated_at", "updated_by", "is_active", "is_deleted"]

        