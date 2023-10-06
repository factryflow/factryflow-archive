# schemas.py
from datetime import datetime
from typing import Optional
from api.models import AssignmentRule, AssignmentRuleCriteria, AssignmentRuleResourceGroup
from ninja import Schema, ModelSchema


class AssignmentRuleIn(Schema):
    name: str
    description: Optional[str] = None
    priority: int
    resource_count:int
    use_all_resources:bool


class AssignmentRuleOut(ModelSchema):
    class Config:
        model = AssignmentRule
        model_fields = "__all__"


class AssignmentRuleCriteriaIn(Schema):
    field: str
    operator: int
    value: int
    parent_id:Optional[int] = None
    assignment_rule_id:int


class AssignmentRuleCriteriaOut(ModelSchema):
    class Config:
        model = AssignmentRuleCriteria
        model_fields = "__all__"
        

class AssignmentRuleResourceGroupIn(Schema):
    assignment_id: int
    resource_id:int


class AssignmentRuleResourceGroupOut(ModelSchema):
    class Config:
        model = AssignmentRuleResourceGroup
        model_fields = "__all__"