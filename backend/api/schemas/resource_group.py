from typing import List

from ninja import ModelSchema
from pydantic import Field

from api.models import ResourceGroup
from api.schemas import ResourceBaseOut, ResourceGroupBaseOut


class ResourceGroupIn(ModelSchema):
    resource_ids: List[int] = Field(default=[])

    class Config:
        model = ResourceGroup
        model_fields = [
            "name",
        ]


class ResourceGroupOut(ResourceGroupBaseOut):
    resources: List[ResourceBaseOut]
