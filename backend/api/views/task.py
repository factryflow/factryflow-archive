from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import Task, TaskStatus, TaskType
from api.schemas import TaskBaseOut, TaskIn, TaskOut, TaskStatusOut, TaskTypeOut
from api.utils.crud_hooks import post_save_hook, pre_save_hook
from api.utils.permissions import apply_permission_check_to_views

task_router = Router()
task_type_router = Router()
task_status_router = Router()


class TaskViewSet(ModelViewSet):
    model_class = Task

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskBaseOut)
    create = CreateModelView(
        input_schema=TaskIn,
        output_schema=TaskOut,
        pre_save=pre_save_hook(),
        post_save=post_save_hook(
            ("m2m", "predecessors", "predecessor_ids"),
            ("m2m", "successors", "successor_ids"),
            ("m2m", "dependencies", "dependency_ids"),
        ),
    )
    retrieve = RetrieveModelView(output_schema=TaskOut)
    update = UpdateModelView(
        input_schema=TaskIn,
        output_schema=TaskOut,
        pre_save=pre_save_hook(),
    )
    delete = DeleteModelView()


class TaskTypeViewSet(ModelViewSet):
    model_class = TaskType

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskTypeOut)


class TaskStatusViewSet(ModelViewSet):
    model_class = TaskStatus

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskStatusOut)


apply_permission_check_to_views(TaskViewSet)
apply_permission_check_to_views(TaskTypeViewSet)
apply_permission_check_to_views(TaskStatusViewSet)

# The register_routes method must be called to register the routes with the router
TaskViewSet.register_routes(task_router)
TaskTypeViewSet.register_routes(task_type_router)
TaskStatusViewSet.register_routes(task_status_router)
