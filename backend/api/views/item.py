from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import Item
from api.schemas import ItemIn, ItemOut
from api.utils.crud_views import SoftDeleteModelView
from api.utils.pre_save_hook import pre_save_hook

item_router = Router()


class ItemViewSet(ModelViewSet):
    model_class = Item

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=ItemOut)
    create = CreateModelView(
        input_schema=ItemIn,
        output_schema=ItemOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=ItemOut)
    update = UpdateModelView(
        input_schema=ItemIn,
        output_schema=ItemOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
ItemViewSet.register_routes(item_router)