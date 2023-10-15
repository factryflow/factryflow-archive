# schemas.py
from typing import Optional
from api.models import AssignmentRule, AssignmentRuleCriteria, AssignmentRuleResourceGroup
from ninja import Schema, ModelSchema


class AssignmentRuleIn(Schema):
    """
    This schema is using for getting the input data for the AssignmentRule model.
    """
    name: str
    description: Optional[str] = None
    priority: int
    resource_count:int
    use_all_resources:bool


class AssignmentRuleOut(ModelSchema):
    """
    This schema is using for returning the output of the AssignmentRule
    """
    class Config:
        model = AssignmentRule
        model_fields = "__all__"


class AssignmentRuleCriteriaIn(Schema):
    """
    This schema is using for getting the input data for the AssignmentRuleCriteria model.
    """
    field: str
    operator: int
    value: int
    parent_id:Optional[int] = None
    assignment_rule_id:int


class AssignmentRuleCriteriaOut(ModelSchema):
    """
    This schema is using for returning the output of the AssignmentRuleCriteria
    """
    class Config:
        model = AssignmentRuleCriteria
        model_fields = "__all__"
        

class AssignmentRuleResourceGroupIn(Schema):
    """
    This schema is using for getting the input data for the AssignmentRuleResourceGroup model.
    """
    assignment_id: int
    resource_id:int


class AssignmentRuleResourceGroupOut(ModelSchema):
    """
    This schema is using for returning the output of the AssignmentRuleResourceGroup
    """
    class Config:
        model = AssignmentRuleResourceGroup
        model_fields = "__all__"