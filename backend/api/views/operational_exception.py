from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import OperationalException, OperationalExceptionType
from api.schemas import (
    OperationalExceptionIn,
    OperationalExceptionOut,
    OperationalExceptionTypeIn,
    OperationalExceptionTypeOut,
)
from api.utils.crud_hooks import pre_save_hook

operational_exception_router = Router()
operational_exception_type_router = Router()


class OperationalExceptionViewSet(ModelViewSet):
    model_class = OperationalException

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=OperationalExceptionOut)
    create = CreateModelView(
        input_schema=OperationalExceptionIn,
        output_schema=OperationalExceptionOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=OperationalExceptionOut)
    update = UpdateModelView(
        input_schema=OperationalExceptionIn,
        output_schema=OperationalExceptionOut,
        pre_save=pre_save_hook(),
    )
    delete = DeleteModelView()


class OperationalExceptionTypeViewSet(ModelViewSet):
    model_class = OperationalExceptionType

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=OperationalExceptionTypeOut)
    create = CreateModelView(
        input_schema=OperationalExceptionTypeIn,
        output_schema=OperationalExceptionTypeOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=OperationalExceptionTypeOut)
    update = UpdateModelView(
        input_schema=OperationalExceptionTypeIn,
        output_schema=OperationalExceptionTypeOut,
        pre_save=pre_save_hook(),
    )
    delete = DeleteModelView()


# The register_routes method must be called to register the routes with the router
OperationalExceptionViewSet.register_routes(operational_exception_router)
OperationalExceptionTypeViewSet.register_routes(operational_exception_type_router)
