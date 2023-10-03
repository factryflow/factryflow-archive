from api.models import Role
from api.schemas import RoleIn, RoleOut
from api.utils.crud_views import SoftDeleteModelView
from api.utils.model_utils import (
    set_created_updated_by_on_create,
    set_updated_by_on_update,
)
from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

role_router = Router()

class RoleViewSet(ModelViewSet):
    model_class = Role
    
    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=RoleOut)
    create = CreateModelView(
        input_schema=RoleIn,
        output_schema=RoleOut,
        pre_save=set_created_updated_by_on_create,
    )
    retrieve = RetrieveModelView(output_schema=RoleOut)
    update = UpdateModelView(
        input_schema=RoleIn,
        output_schema=RoleOut,
        pre_save=set_updated_by_on_update,
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
RoleViewSet.register_routes(role_router)
