# schemas.py
from typing import Optional

from ninja import ModelSchema, Schema

from api.models import Item


class ItemIn(Schema):
    name: str
    description: Optional[str] = None


class ItemOut(ModelSchema):
    class Config:
        model = Item
        model_fields = "__all__"
