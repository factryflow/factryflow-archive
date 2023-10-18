from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import WeeklyShiftTemplate
from api.schemas import (
    WeeklyShiftTemplateIn,
    WeeklyShiftTemplateOut,
)
from api.utils.crud_hooks import pre_save_hook
from api.utils.crud_views import SoftDeleteModelView

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
