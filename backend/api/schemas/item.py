# schemas.py
from typing import Optional
from api.models import Item
from ninja import Schema, ModelSchema


class ItemIn(Schema):
    """
    This schema is using for getting the input data for the Item model.
    """
    name: str
    description: Optional[str] = None


class ItemOut(ModelSchema):
    """
    This schema is using for returning the output of the Item
    """
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
