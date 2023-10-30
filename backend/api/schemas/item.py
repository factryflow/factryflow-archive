# schemas.py
from typing import Optional, List

from ninja import ModelSchema, Schema

from api.models import Item

class CustomFieldValueSchema(Schema):
    field_name: str
    value: str

class ItemIn(Schema):
    name: str
    description: Optional[str] = None


class ItemOut(ModelSchema):
    custom_values: Optional[List[CustomFieldValueSchema]]
    class Config:
        model = Item
        model_fields = "__all__"
