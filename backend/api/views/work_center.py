from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import WorkCenter
from api.schemas import WorkCenterIn, WorkCenterOut
from api.utils.crud_hooks import pre_save_hook

work_center_router = Router()


class WorkCenterViewSet(ModelViewSet):
    model_class = WorkCenter

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=WorkCenterOut)
    create = CreateModelView(
        input_schema=WorkCenterIn,
        output_schema=WorkCenterOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=WorkCenterOut)
    update = UpdateModelView(
        input_schema=WorkCenterIn,
        output_schema=WorkCenterOut,
        pre_save=pre_save_hook(),
    )
    delete = DeleteModelView()


# The register_routes method must be called to register the routes with the router
WorkCenterViewSet.register_routes(work_center_router)
