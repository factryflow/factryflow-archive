from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import CustomFieldValue
from api.schemas import (
    CustomFieldValueIn, 
    CustomFieldValueOut

)
from api.utils.crud_hooks import pre_save_hook

custom_field_value_router = Router()

class CustomFieldValueViewSet(ModelViewSet):
    model_class = CustomFieldValue 
    list = ListModelView(output_schema= CustomFieldValueOut)
    create = CreateModelView(
        input_schema= CustomFieldValueIn, 
        output_schema= CustomFieldValueOut, 
        pre_save= pre_save_hook()
    )
    retrieve = RetrieveModelView(output_schema= CustomFieldValueOut)
    update = UpdateModelView(
        input_schema= CustomFieldValueIn, 
        output_schema= CustomFieldValueOut, 
        pre_save= pre_save_hook()
    )
    delete = DeleteModelView()

CustomFieldValueViewSet.register_routes(custom_field_value_router)


