from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import Resource, ResourceGroup


class Resource(ModelSchema):
    class Config:
        model = Resource
        model_exclude = ["resource_groups"]


class ResourceGroupIn(ModelSchema):
    resource_ids: List[int] = Field(default=[])

    class Config:
        model = ResourceGroup
        model_fields = [
            "name",
        ]


class ResourceGroupOut(ModelSchema):
    # resource_ids: List[int] = Field(default=[],)
    resources: List[Resource]

    class Config:
        model = ResourceGroup
        model_fields = "__all__"
