from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import (
    AssignmentRule,
    AssignmentRuleCriteria,
    AssignmentRuleResourceGroup,
)
from api.schemas import (
    AssignmentRuleIn,
    AssignmentRuleOut,
    AssignmentRuleCriteriaIn,
    AssignmentRuleCriteriaOut,
    AssignmentRuleResourceGroupIn,
    AssignmentRuleResourceGroupOut,
)
from api.utils.crud_views import SoftDeleteModelView
from api.utils.pre_save_hook import pre_save_hook


assignment_rule_router = Router()


class AssignmentRuleViewSet(ModelViewSet):
    model_class = AssignmentRule

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=AssignmentRuleOut)
    create = CreateModelView(
        input_schema=AssignmentRuleIn,
        output_schema=AssignmentRuleOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=AssignmentRuleOut)
    update = UpdateModelView(
        input_schema=AssignmentRuleIn,
        output_schema=AssignmentRuleOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
AssignmentRuleViewSet.register_routes(assignment_rule_router)

# Assignment Rule Criteria
assignment_rule_criteria_router = Router()


class AssignmentRuleCriteriaViewSet(ModelViewSet):
    model_class = AssignmentRuleCriteria

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=AssignmentRuleCriteriaOut)
    create = CreateModelView(
        input_schema=AssignmentRuleCriteriaIn,
        output_schema=AssignmentRuleCriteriaOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=AssignmentRuleCriteriaOut)
    update = UpdateModelView(
        input_schema=AssignmentRuleCriteriaIn,
        output_schema=AssignmentRuleCriteriaOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
AssignmentRuleCriteriaViewSet.register_routes(assignment_rule_criteria_router)

# AssignmentRuleResourceGroup
assignment_rule_resource_group_router = Router()


class AssignmentRuleResourceGroupViewSet(ModelViewSet):
    model_class = AssignmentRuleResourceGroup

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=AssignmentRuleResourceGroupOut)
    create = CreateModelView(
        input_schema=AssignmentRuleResourceGroupIn,
        output_schema=AssignmentRuleResourceGroupOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=AssignmentRuleResourceGroupOut)
    update = UpdateModelView(
        input_schema=AssignmentRuleResourceGroupIn,
        output_schema=AssignmentRuleResourceGroupOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
AssignmentRuleResourceGroupViewSet.register_routes(
    assignment_rule_resource_group_router
)
