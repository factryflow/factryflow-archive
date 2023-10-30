from ninja import ModelSchema
from pydantic import Field
from enum import Enum
from typing import Optional, List

from api.models import CustomField, CustomFieldValue
from api.schemas import CustomFieldBaseOut
from pydantic import BaseModel, conint

class FieldType(str, Enum): 
    TEXT = "text"
    NUMBER = "number"
    DATE = "date"
    BOOLEAN = "boolean"

class CustomFieldIn(ModelSchema):
    field_type : FieldType
    label : Optional[str]

    class Config:
        model = CustomField
        model_fields = [
            "field_name"
        ]

class CustomFieldValueIn(BaseModel):
    custom_field_id: conint(ge=1)
    object_id: conint(ge=1)
    value: str 

class CustomFieldValueOut(ModelSchema):
    class Config:
        model= CustomFieldValue
        model_fields = "__all__"

class CustomFieldOut(CustomFieldBaseOut):
    # custom_field_values: List[CustomFieldValueOut]
    custom_field_values: List[dict]
