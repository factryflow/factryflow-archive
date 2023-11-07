# schemas.py
from ninja import ModelSchema
from pydantic import Field

from api.models import (
    AssignmentRule,
    AssignmentRuleCriteria,
)
from api.schemas.base import AssignmentRuleBaseOut


class AssignmentRuleCriteriaIn(ModelSchema):
    assigment_rule_id: int

    class Config:
        model = AssignmentRuleCriteria
        model_fields = ["field", "operator", "value"]


class AssignmentRuleCriteriaOut(ModelSchema):
    class Config:
        model = AssignmentRuleCriteria
        model_fields = "__all__"


class AssignmentRuleIn(ModelSchema):
    work_center_id: int = Field(..., example=1)
    resource_group_id: int = Field(..., example=1)

    class Config:
        model = AssignmentRule
        model_fields = ["name", "description", "priority"]


class AssignmentRuleOut(AssignmentRuleBaseOut):
    criteria: list[AssignmentRuleCriteriaOut]

    class Config:
        model = AssignmentRule
        model_fields = "__all__"
