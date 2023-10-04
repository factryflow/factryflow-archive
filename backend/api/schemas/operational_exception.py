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
        model_fields = ["id", "name", "created_at", "created_by", "updated_at", "updated_by", "is_active", "is_deleted"]
        
        
class OperationalExceptionIn(Schema):
    external_id: str
    start_datetime: datetime
    end_datetime: datetime
    notes: Optional[str] = None
    


class OperationalExceptionOut(ModelSchema):
    class Config:
        model = OperationalException
        model_fields = ["id","external_id", "operational_exception_type", "start_datetime", "end_datetime", "notes", "weekly_shift_template", "created_at", "created_by", "updated_at", "updated_by", "is_active", "is_deleted"]

        