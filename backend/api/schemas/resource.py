from typing import List, Optional

from ninja import ModelSchema
from pydantic import Field

from api.models import Resource
from api.schemas import (
    ResourceBaseOut,
    ResourceGroupBaseOut,
    WeeklyShiftTemplateBaseOut,
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
    weekly_shift_template: WeeklyShiftTemplateBaseOut = None
    resource_groups: List[ResourceGroupBaseOut]
