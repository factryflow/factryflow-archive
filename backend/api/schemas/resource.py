from typing import List, Optional

from ninja import ModelSchema
from pydantic import Field, root_validator

from api.models import Resource
from api.schemas.base import (
    OperationalExceptionBaseOut,
    ResourceBaseOut,
    ResourceGroupBaseOut,
)


class ResourceIn(ModelSchema):
    weekly_shift_template_id: Optional[int] = None
    resource_group_ids: List[int] = Field(default=[])

    class Config:
        model = Resource
        model_fields = [
            "name",
        ]

    # Ensure that all resources are added to rg with id 1, which is rg "ALL"
    @root_validator(pre=True)
    def ensure_one_in_resource_group_ids(cls, values):
        resource_group_ids = values.get("resource_group_ids", [])
        if 1 not in resource_group_ids:
            resource_group_ids.append(1)
        values["resource_group_ids"] = resource_group_ids
        return values


class ResourceOut(ResourceBaseOut):
    resource_groups: List[ResourceGroupBaseOut]
    operational_exceptions: List[OperationalExceptionBaseOut] = Field(default=[])
