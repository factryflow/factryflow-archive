from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import ScheduleRun, ScheduleRunStatus
from api.schemas import ScheduleRunIn, ScheduleRunOut, ScheduleRunStatusOut
from api.utils.crud_hooks import pre_save_hook
from api.utils.crud_views import SoftDeleteModelView

schedule_run_status_router = Router()


class ScheduleRunStatusViewSet(ModelViewSet):
    model_class = ScheduleRunStatus

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=ScheduleRunStatusOut)


ScheduleRunStatusViewSet.register_routes(schedule_run_status_router)


schedule_run_router = Router()


class ScheduleRunViewSet(ModelViewSet):
    model_class = ScheduleRun

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=ScheduleRunOut)
    create = CreateModelView(
        input_schema=ScheduleRunIn,
        output_schema=ScheduleRunOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=ScheduleRunOut)
    update = UpdateModelView(
        input_schema=ScheduleRunIn,
        output_schema=ScheduleRunOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
ScheduleRunViewSet.register_routes(schedule_run_router)
