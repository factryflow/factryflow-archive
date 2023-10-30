# schemas.py
from typing import Optional, List

from ninja import ModelSchema, Schema

from api.models import Item
from api.schemas.custom_field import CustomValuesListedOut

class ItemIn(Schema):
    name: str
    description: Optional[str] = None


class ItemOut(ModelSchema):
    custom_values: Optional[List[CustomValuesListedOut]]
    class Config:
        model = Item
        model_fields = "__all__"
