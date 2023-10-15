# schemas.py
from datetime import datetime
from typing import Optional
from api.models import Dependency, DependencyTypes, DependencyStatus
from ninja import Schema, ModelSchema


class DependencyIn(Schema):
    """
    This schema is using for getting the input data for the Dependency model.
    """
    name: str
    external_id: str
    dependency_type_id: Optional[int] = None
    dependency_status_id: Optional[int] = None
    expected_close_datetime: datetime
    actual_close_datetime: datetime
    notes: Optional[str] = None


class DependencyTypeIn(Schema):
    """
    This schema is using for getting the input data for the DependencyType model.
    """
    name: str
    description: Optional[str] = None


class DependencyStatusIn(Schema):
    """
    This schema is using for getting the input data for the DependencyStatus model.
    """
    name: str


class DependencyOut(ModelSchema):
    """
    This schema is using for returning the output of the Dependency
    """
    class Config:
        model = Dependency
        model_fields = "__all__"


class DependencyTypeOut(ModelSchema):
    """
    This schema is using for returning the output of the DependencyType
    """
    class Config:
        model = DependencyTypes
        model_fields = "__all__"


class DependencyStatusOut(ModelSchema):
    """
    This schema is using for returning the output of the DependencyStatus
    """
    class Config:
        model = DependencyStatus
        model_fields = "__all__"
