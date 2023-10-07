# schemas.py
from datetime import datetime, date
from typing import Optional
from api.models import Dependency, DependencyTypes, DependencyStatus
from ninja import Schema, ModelSchema

    
class DependencyIn(Schema):
    name: str
    external_id: str
    dependency_type_id: Optional[int] = None
    dependency_status_id: Optional[int] = None
    expected_close_datetime: datetime
    actual_close_datetime: datetime
    notes: Optional[str] = None


class DependencyTypeIn(Schema):
    name: str
    description: Optional[str] = None
    
class DependencyStatusIn(Schema):
    name: str
    

class DependencyOut(ModelSchema):
    class Config:
        model = Dependency
        model_fields = "__all__"


class DependencyTypeOut(ModelSchema):
    class Config:
        model = DependencyTypes
        model_fields = "__all__"
        

class DependencyStatusOut(ModelSchema):
    class Config:
        model = DependencyStatus
        model_fields = "__all__"
