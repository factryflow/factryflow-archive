# schemas.py
from ninja import ModelSchema, Schema

from api.models import OperationalException, OperationalExceptionType
from api.schemas.base import (
    OperationalExceptionBaseOut,
    ResourceBaseOut,
    WeeklyShiftTemplateBaseOut,
)


class OperationalExceptionTypeIn(Schema):
    name: str


class OperationalExceptionTypeOut(ModelSchema):
    class Config:
        model = OperationalExceptionType
        model_fields = ["id", "name"]


class OperationalExceptionIn(ModelSchema):
    operational_exception_type_id: int
    weekly_shift_template_id: int = None
    resource_id: int

    class Config:
        model = OperationalException
        model_fields = [
            "external_id",
            "start_datetime",
            "end_datetime",
            "notes",
        ]


class OperationalExceptionOut(OperationalExceptionBaseOut):
    resource: ResourceBaseOut
    weekly_shift_template: WeeklyShiftTemplateBaseOut = None

    class Config:
        model = OperationalException
        model_fields = "__all__"
