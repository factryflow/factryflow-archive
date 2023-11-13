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
from api.schemas import CustomFieldIn, CustomFieldOut
from api.utils.crud_hooks import pre_save_hook
from api.utils.permissions import apply_permission_check_to_views

custom_field_router = Router()


class CustomFieldViewSet(ModelViewSet):
    model_class = CustomField
    list = ListModelView(output_schema=CustomFieldOut)
    create = CreateModelView(
        input_schema=CustomFieldIn,
        output_schema=CustomFieldOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=CustomFieldOut)
    update = UpdateModelView(
        input_schema=CustomFieldIn,
        output_schema=CustomFieldOut,
        pre_save=pre_save_hook(),
    )
    delete = DeleteModelView()


apply_permission_check_to_views(CustomFieldViewSet)

CustomFieldViewSet.register_routes(custom_field_router)
