from typing import List, Optional

from ninja import ModelSchema
from pydantic import Field

from api.models import Resource, ResourceGroup


class ResourceGroup(ModelSchema):
    class Config:
        model = ResourceGroup
        model_fields = "__all__"


class ResourceIn(ModelSchema):
    weekly_shift_template_id: Optional[int] = None
    resource_group_ids: List[int] = Field(default=[])

    class Config:
        model = Resource
        model_fields = [
            "name",
        ]


class ResourceOut(ModelSchema):
    weekly_shift_template_id: Optional[int] = None
    # resource_group_ids: List[int] = Field(default=[], alias="resource_groups_id")
    resource_groups: List[ResourceGroup]

    class Config:
        model = Resource
        model_exclude = ["resource_groups", "weekly_shift_template"]
