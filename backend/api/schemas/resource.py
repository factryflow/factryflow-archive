from typing import List, Optional

from ninja import ModelSchema
from pydantic import Field

from api.models import Resource
from api.schemas.base import (
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


class ResourceOut(ResourceBaseOut):
    resource_groups: List[ResourceGroupBaseOut]
