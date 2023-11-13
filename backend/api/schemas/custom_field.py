from ninja import ModelSchema
from pydantic import Field
from enum import Enum
from typing import Optional

from api.models import CustomField

class FieldType(str, Enum): 
    TEXT = "text"
    NUMBER = "number"
    DATE = "date"
    BOOLEAN = "boolean"
    DATETIME = "datetime"
    TIME = "time"

class CustomFieldIn(ModelSchema):
    field_type : FieldType
    class Config:
        model = CustomField
        model_fields = [
            "field_name", 
            "related_model"
        ]

class CustomFieldOut(ModelSchema):
    class Config:
        model = CustomField
        model_fields = "__all__"