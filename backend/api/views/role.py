from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import Role
from api.schemas import RoleIn, RoleOut
from api.utils.crud_views import SoftDeleteModelView
from api.utils.pre_save_hook import pre_save_hook

role_router = Router()


class RoleViewSet(ModelViewSet):
    """
    This View is related to Role Views
    Here we are including the all CRUD operations
    """
    model_class = Role

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=RoleOut)
    create = CreateModelView(
        input_schema=RoleIn,
        output_schema=RoleOut,
        pre_save=pre_save_hook,
    )
    retrieve = RetrieveModelView(output_schema=RoleOut)
    update = UpdateModelView(
        input_schema=RoleIn,
        output_schema=RoleOut,
        pre_save=pre_save_hook,
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
RoleViewSet.register_routes(role_router)
