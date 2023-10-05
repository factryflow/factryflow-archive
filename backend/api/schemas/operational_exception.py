# schemas.py
from datetime import datetime, date
from typing import Optional
from api.models import OperationalExceptionType, OperationalException
from ninja import Schema, ModelSchema


class OperationalExceptionTypeIn(Schema):
    name: str
    

class OperationalExceptionTypeOut(ModelSchema):
    class Config:
        model = OperationalExceptionType
        model_fields = ["id", "name"]
        
        
class OperationalExceptionIn(Schema):
    external_id: str
    start_datetime: datetime
    end_datetime: datetime
    notes: Optional[str] = None
    weekly_shift_template_id: int
    operational_exception_type_id:int


class OperationalExceptionOut(ModelSchema):
    class Config:
        model = OperationalException
        model_fields = "__all__"

        