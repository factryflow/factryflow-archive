from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import Resource
from api.schemas import ResourceIn, ResourceOut
from api.utils.crud_hooks import post_save_hook, pre_save_hook
from api.utils.crud_views import SoftDeleteModelView

resource_router = Router()


class ResourceViewSet(ModelViewSet):
    model_class = Resource

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=ResourceOut)
    create = CreateModelView(
        input_schema=ResourceIn,
        output_schema=ResourceOut,
        pre_save=pre_save_hook(),
        post_save=post_save_hook("resource_groups", "resource_group_ids"),
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
