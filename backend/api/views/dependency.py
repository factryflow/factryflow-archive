from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)
from api.models import Dependency, DependencyTypes, DependencyStatus
from api.schemas import DependencyIn, DependencyOut, DependencyStatusIn, DependencyStatusOut, DependencyTypeIn, DependencyTypeOut
from api.utils.crud_views import SoftDeleteModelView
from api.utils.pre_save_hook import pre_save_hook


dependency_type_router = Router()
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
    delete = SoftDeleteModelView()


DependencyTypeViewSet.register_routes(dependency_type_router)


dependency_status_router = Router()
class DependencyStatusViewSet(ModelViewSet):
    model_class = DependencyStatus

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=DependencyStatusOut)
    create = CreateModelView(
        input_schema=DependencyStatusIn,
        output_schema=DependencyStatusOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=DependencyStatusOut)
    update = UpdateModelView(
        input_schema=DependencyStatusIn,
        output_schema=DependencyStatusOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()
DependencyStatusViewSet.register_routes(dependency_status_router)


dependency_router = Router()
class DependencyViewSet(ModelViewSet):
    model_class = Dependency

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=DependencyOut)
    create = CreateModelView(
        input_schema=DependencyIn,
        output_schema=DependencyOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=DependencyOut)
    update = UpdateModelView(
        input_schema=DependencyIn,
        output_schema=DependencyOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
DependencyViewSet.register_routes(dependency_router)
