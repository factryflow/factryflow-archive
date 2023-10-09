from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import Tasks, TaskStatus, TaskType
from api.schemas import TaskIn, TaskOut, TaskStatusOut, TaskTypeOut
from api.utils.crud_views import SoftDeleteModelView
from api.utils.pre_save_hook import pre_save_hook


task_type_router = Router()
class TaskTypeViewSet(ModelViewSet):
    model_class = TaskType

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskTypeOut)
TaskTypeViewSet.register_routes(task_type_router)


task_status_router = Router()
class TaskStatusViewSet(ModelViewSet):
    model_class = TaskStatus

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskStatusOut)
TaskStatusViewSet.register_routes(task_status_router)


task_router = Router()
class TaskViewSet(ModelViewSet):
    model_class = Tasks

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskOut)
    create = CreateModelView(
        input_schema=TaskIn,
        output_schema=TaskOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=TaskOut)
    update = UpdateModelView(
        input_schema=TaskIn,
        output_schema=TaskOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()
# The register_routes method must be called to register the routes with the router
TaskViewSet.register_routes(task_router)