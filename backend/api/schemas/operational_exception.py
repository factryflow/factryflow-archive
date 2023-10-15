# schemas.py
from datetime import datetime
from typing import Optional
from api.models import OperationalExceptionType, OperationalException
from ninja import Schema, ModelSchema


class OperationalExceptionTypeIn(Schema):
    """
    This schema is using for getting the input data for the OperationalExceptionType model.
    """
    name: str
    

class OperationalExceptionTypeOut(ModelSchema):
    """
    This schema is using for returning the output of the OperationalExceptionType
    """
    class Config:
        model = OperationalExceptionType
        model_fields = ["id", "name"]
        
        
class OperationalExceptionIn(Schema):
    """
    This schema is using for getting the input data for the OperationalException model.
    """
    external_id: str
    start_datetime: datetime
    end_datetime: datetime
    notes: Optional[str] = None
    weekly_shift_template_id: int
    operational_exception_type_id:int


class OperationalExceptionOut(ModelSchema):
    """
    This schema is using for returning the output of the OperationalException
    """
    class Config:
        model = OperationalException
        model_fields = "__all__"

        