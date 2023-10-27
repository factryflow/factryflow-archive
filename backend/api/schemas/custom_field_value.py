from ninja import ModelSchema
from pydantic import Field
from enum import Enum
from typing import Optional, List

from api.models import CustomFieldValue
from pydantic import BaseModel, conint

class CustomFieldValueIn(BaseModel):
    custom_field_id: conint(ge=1)
    object_id: conint(ge=1)
    value: str 

class CustomFieldValueOut(ModelSchema):
    class Config:
        model= CustomFieldValue
        model_fields = "__all__"