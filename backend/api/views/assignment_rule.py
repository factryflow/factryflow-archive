from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import (
    AssignmentRule,
    AssignmentRuleCriteria,
)
from api.schemas import (
    AssignmentRuleCriteriaIn,
    AssignmentRuleCriteriaOut,
    AssignmentRuleIn,
    AssignmentRuleOut,
)
from api.utils.crud_hooks import pre_save_hook
from api.utils.permissions import apply_permission_check_to_views

assignment_rule_router = Router()
assignment_rule_criteria_router = Router()


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
    delete = DeleteModelView()


# Assignment Rule Criteria


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
    delete = DeleteModelView()


apply_permission_check_to_views(AssignmentRuleViewSet)
apply_permission_check_to_views(AssignmentRuleCriteriaViewSet)

# The register_routes method must be called to register the routes with the router
AssignmentRuleViewSet.register_routes(assignment_rule_router)
AssignmentRuleCriteriaViewSet.register_routes(assignment_rule_criteria_router)
