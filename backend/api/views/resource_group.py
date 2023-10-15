from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import ResourceGroup
from api.schemas import ResourceGroupIn, ResourceGroupOut
from api.utils.crud_hooks import post_save_hook, pre_save_hook
from api.utils.crud_views import SoftDeleteModelView

# Assignment Rule Criteria
resource_group_router = Router()


class ResourceGroupsViewSet(ModelViewSet):
    model_class = ResourceGroup

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=ResourceGroupOut)
    create = CreateModelView(
        input_schema=ResourceGroupIn,
        output_schema=ResourceGroupOut,
        pre_save=pre_save_hook(),
        post_save=post_save_hook(("resources", "resource_ids")),
    )
    retrieve = RetrieveModelView(output_schema=ResourceGroupOut)
    update = UpdateModelView(
        input_schema=ResourceGroupIn,
        output_schema=ResourceGroupOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
ResourceGroupsViewSet.register_routes(resource_group_router)
