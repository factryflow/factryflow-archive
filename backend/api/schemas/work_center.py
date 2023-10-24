# schemas.py

from ninja import ModelSchema

from api.models import WorkCenter


class WorkCenterIn(ModelSchema):
    class Config:
        model = WorkCenter
        model_fields = ["name", "notes"]


class WorkCenterOut(ModelSchema):
    class Config:
        model = WorkCenter
        model_fields = "__all__"
