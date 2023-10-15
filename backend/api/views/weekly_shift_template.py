from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import WeeklyShiftTemplate, WeeklyShiftTemplateDetail
from api.schemas import (
    WeeklyShiftTemplateDetailIn,
    WeeklyShiftTemplateDetailOut,
    WeeklyShiftTemplateIn,
    WeeklyShiftTemplateOut,
)
from api.utils.crud_views import SoftDeleteModelView
from api.utils.pre_save_hook import pre_save_hook

weeklyshift_template_router = Router()


class WeeklyShiftTemplateViewSet(ModelViewSet):
    """
    This View is related to Weekly Shift Template Views
    Here we are including the all CRUD operations
    """
    model_class = WeeklyShiftTemplate

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=WeeklyShiftTemplateOut)
    create = CreateModelView(
        input_schema=WeeklyShiftTemplateIn,
        output_schema=WeeklyShiftTemplateOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=WeeklyShiftTemplateOut)
    update = UpdateModelView(
        input_schema=WeeklyShiftTemplateIn,
        output_schema=WeeklyShiftTemplateOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
WeeklyShiftTemplateViewSet.register_routes(weeklyshift_template_router)


weeklyshift_template_detail_router = Router()


class WeeklyShiftTemplateDetailsViewSet(ModelViewSet):
    """
    This View is related to Weekly Shift Template Details Views
    Here we are including the all CRUD operations
    """
    model_class = WeeklyShiftTemplateDetail

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=WeeklyShiftTemplateDetailOut)
    create = CreateModelView(
        input_schema=WeeklyShiftTemplateDetailIn,
        output_schema=WeeklyShiftTemplateDetailOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=WeeklyShiftTemplateDetailOut)
    update = UpdateModelView(
        input_schema=WeeklyShiftTemplateDetailIn,
        output_schema=WeeklyShiftTemplateDetailOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
WeeklyShiftTemplateDetailsViewSet.register_routes(weeklyshift_template_detail_router)
