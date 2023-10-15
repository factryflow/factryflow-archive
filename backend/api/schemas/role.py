# schemas.py
from datetime import datetime
from typing import Optional
from api.models import Role
from ninja import Schema, ModelSchema


class RoleIn(Schema):
    """
    This schema is using for getting the input data for the Role model.
    """
    name: str


class RoleOut(ModelSchema):
    """
    This schema is using for returning the output of the Role
    """
    class Config:
        model = Role
        model_fields = ["id", "name", "created_at", "created_by", "updated_at", "updated_by", "is_active"]
