from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import Dependency, DependencyStatus, DependencyTypes
from api.schemas import (
    DependencyIn,
    DependencyOut,
    DependencyStatusOut,
    DependencyTypeIn,
    DependencyTypeOut,
)
from api.utils.crud_hooks import post_save_hook, pre_save_hook
from api.utils.permissions import apply_permission_check_to_views

dependency_router = Router()
dependency_type_router = Router()
dependency_status_router = Router()


class DependencyViewSet(ModelViewSet):
    model_class = Dependency

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=DependencyOut)
    create = CreateModelView(
        input_schema=DependencyIn,
        output_schema=DependencyOut,
        pre_save=pre_save_hook(),
        post_save=post_save_hook(
            ("m2m", "jobs", "job_ids"),
            ("m2m", "tasks", "task_ids"),
        ),
    )
    retrieve = RetrieveModelView(output_schema=DependencyOut)
    update = UpdateModelView(
        input_schema=DependencyIn,
        output_schema=DependencyOut,
        pre_save=pre_save_hook(),
    )
    delete = DeleteModelView()


class DependencyTypeViewSet(ModelViewSet):
    model_class = DependencyTypes

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=DependencyTypeOut)
    create = CreateModelView(
        input_schema=DependencyTypeIn,
        output_schema=DependencyTypeOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=DependencyTypeOut)
    update = UpdateModelView(
        input_schema=DependencyTypeIn,
        output_schema=DependencyTypeOut,
        pre_save=pre_save_hook(),
    )
    delete = DeleteModelView()


class DependencyStatusViewSet(ModelViewSet):
    model_class = DependencyStatus

    list = ListModelView(output_schema=DependencyStatusOut)


apply_permission_check_to_views(DependencyViewSet)
apply_permission_check_to_views(DependencyTypeViewSet)
apply_permission_check_to_views(DependencyStatusViewSet)

# The register_routes method must be called to register the routes with the router
DependencyViewSet.register_routes(dependency_router)
DependencyTypeViewSet.register_routes(dependency_type_router)
DependencyStatusViewSet.register_routes(dependency_status_router)
