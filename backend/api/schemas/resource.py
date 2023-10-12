# schemas.py
from api.models import Resources, ResourceGroups
from ninja import Schema, ModelSchema


class ResourceIn(Schema):
    name: str
    weekly_shift_template_id: int
    resource_groups_list: list


class ResourceOut(ModelSchema):
    class Config:
        model = Resources
        model_fields = "__all__"


class ResourceGroupsIn(Schema):
    name: str
    resources_list: list


class ResourceGroupsOut(ModelSchema):
    class Config:
        model = ResourceGroups
        model_fields = "__all__"
