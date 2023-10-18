from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import Task, TaskStatus, TaskType
from api.schemas import TaskIn, TaskOut, TaskStatusOut, TaskTypeOut
from api.utils.crud_hooks import post_save_hook, pre_save_hook
from api.utils.crud_views import SoftDeleteModelView

task_type_router = Router()


class TaskTypeViewSet(ModelViewSet):
    """
    This View is related to Task Type Views
    Here we are including the List operations
    """
    model_class = TaskType

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskTypeOut)


TaskTypeViewSet.register_routes(task_type_router)


task_status_router = Router()


class TaskStatusViewSet(ModelViewSet):
    """
    This View is related to Task Status Views
    Here we are including the List operations
    """
    model_class = TaskStatus

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskStatusOut)


TaskStatusViewSet.register_routes(task_status_router)


task_router = Router()


class TaskViewSet(ModelViewSet):
    """
    This View is related to Task Views
    Here we are including the all CRUD operations
    """
    model_class = Task

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=TaskOut)
    create = CreateModelView(
        input_schema=TaskIn,
        output_schema=TaskOut,
        pre_save=pre_save_hook(),
        post_save=post_save_hook(
            ("m2m", "predecessors", "predecessor_ids"),
            ("m2m", "dependencies", "dependency_ids"),
        ),
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
