# schemas.py

from ninja import ModelSchema

from api.models import DependencyTypes


class DependencyTypeIn(ModelSchema):
    class Config:
        model = DependencyTypes
        model_fields = ["name"]


class DependencyTypeOut(ModelSchema):
    class Config:
        model = DependencyTypes
        model_fields = "__all__"
