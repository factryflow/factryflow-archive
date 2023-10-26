from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import CustomField
from api.schemas import (
    CustomFieldIn, 
    CustomFieldOut

)
from api.utils.crud_hooks import pre_save_hook

custom_field_router = Router()

class CustomFieldViewSet(ModelViewSet):
    model_class = CustomField   
    list = ListModelView(output_schema= CustomFieldOut)
    create = CreateModelView(
        input_schema= CustomFieldIn, 
        output_schema= CustomFieldOut
    )

CustomFieldViewSet.register_routes(custom_field_router)
