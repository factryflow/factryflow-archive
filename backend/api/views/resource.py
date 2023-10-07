from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)
from api.models import Resources, ResourceGroups
from api.schemas import ResourceIn, ResourceOut, ResourceGroupsIn, ResourceGroupsOut
from api.utils.crud_views import SoftDeleteModelView
from api.utils.pre_save_hook import pre_save_hook


resource_router = Router()


class ResourceViewSet(ModelViewSet):
    model_class = Resources

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=ResourceOut)
    create = CreateModelView(
        input_schema=ResourceIn,
        output_schema=ResourceOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=ResourceOut)
    update = UpdateModelView(
        input_schema=ResourceIn,
        output_schema=ResourceOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
ResourceViewSet.register_routes(resource_router)

#Assignment Rule Criteria
resource_group_router = Router()


class ResourceGroupsViewSet(ModelViewSet):
    model_class = ResourceGroups

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=ResourceGroupsOut)
    create = CreateModelView(
        input_schema=ResourceGroupsIn,
        output_schema=ResourceGroupsOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=ResourceGroupsOut)
    update = UpdateModelView(
        input_schema=ResourceGroupsIn,
        output_schema=ResourceGroupsOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
ResourceGroupsViewSet.register_routes(resource_group_router)

