# schemas.py
from datetime import time
from api.models import WeeklyShiftTemplate, WeeklyShiftTemplateDetail
from ninja import Schema, ModelSchema


class WeeklyShiftTemplateIn(Schema):
    """
    This schema is using for getting the input data for the WeeklyShiftTemplate model.
    """
    name: str
    

class WeeklyShiftTemplateOut(ModelSchema):
    """
    This schema is using for returning the output of the WeeklyShiftTemplate model.
    """
    class Config:
        model = WeeklyShiftTemplate
        model_fields = "__all__"
        
        
class WeeklyShiftTemplateDetailIn(Schema):
    """
    This schema is using for getting the input data for the WeeklyShiftTemplateDetail model.
    """
    day_of_week: int
    start_time: time
    end_time: time
    template_id:int
    

class WeeklyShiftTemplateDetailOut(ModelSchema):
    """
    This schema is using for returning the output of the WeeklyShiftTemplateDetail model.
    """
    class Config:
        model = WeeklyShiftTemplateDetail
        model_fields = "__all__"

        