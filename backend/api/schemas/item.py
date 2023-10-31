# schemas.py
from typing import Optional

from ninja import ModelSchema, Schema

from api.models import Item
from api.utils.generate_custom_schema  import generate_custom_field_schema


class ItemIn(Schema):
    name: str
    description: Optional[str] = None
    custom_fields: Optional[generate_custom_field_schema(model_name= 'Item')]


class ItemOut(ModelSchema):
    custom_fields: Optional[generate_custom_field_schema(model_name= 'Item')]
    class Config:
        model = Item
        model_fields = "__all__"
