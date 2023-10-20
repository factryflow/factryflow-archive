# schemas.py
from ninja import ModelSchema, Schema

from api.models import Role


class RoleIn(Schema):
    name: str


class RoleOut(ModelSchema):
    class Config:
        model = Role
        model_fields = "__all__"
