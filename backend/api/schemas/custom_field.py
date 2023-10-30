from ninja import ModelSchema, Schema
from pydantic import Field
from enum import Enum
from typing import Optional, List

from api.models import CustomField, CustomFieldValue
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
    related_model: str
    value: str 

class CustomFieldValueOut(ModelSchema):
    class Config:
        model= CustomFieldValue
        model_fields = "__all__"

class CustomFieldOut(ModelSchema):
    custom_field_values: List[dict]
    custom_values_ids: List[int] = Field([], alias= "value_id_list")
    custom_field_values: List[dict] = Field([], alias= "custom_field_values")
    class Config:
        model = CustomField
        model_fields = "__all__"

class CustomValuesListedOut(Schema):
    field_name: str
    value: str
