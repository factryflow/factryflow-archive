# schemas.py
from datetime import datetime
from typing import Optional
from api.models import Role
from .user import UserOut
from ninja import Schema, ModelSchema


class RoleIn(Schema):
    name: str


class RoleOut(ModelSchema):
    class Config:
        model = Role
        model_fields = [
            "id",
            "name",
            "created_at",
            "created_by",
            "updated_at",
            "updated_by",
            "is_active",
        ]
