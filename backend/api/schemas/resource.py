# schemas.py
from api.models import Resources, ResourceGroups
from ninja import Schema, ModelSchema


class ResourceIn(Schema):
    """
    This schema is using for getting the input data for the Resource model.
    """
    name: str
    weekly_shift_template_id: int
    resource_groups_list: list


class ResourceOut(ModelSchema):
    """
    This schema is using for returning the output of the Resource
    """
    class Config:
        model = Resources
        model_fields = "__all__"


class ResourceGroupsIn(Schema):
    """
    This schema is using for getting the input data for the ResourceGroups model.
    """
    name: str
    resources_list: list


class ResourceGroupsOut(ModelSchema):
    """
    This schema is using for returning the output of the ResourceGroups
    """
    class Config:
        model = ResourceGroups
        model_fields = "__all__"
