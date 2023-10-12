# schemas.py
from datetime import datetime
from typing import Optional
from api.models import Item
from .user import UserOut
from ninja import Schema, ModelSchema


class ItemIn(Schema):
    name: str
    description: Optional[str] = None


class ItemOut(ModelSchema):
    class Config:
        model = Item
        model_fields = [
            "id",
            "name",
            "description",
            "created_at",
            "created_by",
            "updated_at",
            "updated_by",
            "is_active",
        ]
