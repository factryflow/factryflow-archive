from ninja_crud.views import (
    ListModelView as BaseListModelView, 
    RetrieveModelView as BaseRetrieveModelView
)
from ..utils.fetch_custom_fields import fetch_custom_fields

class CustomListModelView(BaseListModelView):
    def render_output(self, items, request):
        # Get the model's name from the view's model_class
        model_name = self.__class__.__name__
        
        object_ids = [item.pk for item in items]
        custom_values_dict = fetch_custom_fields(model_name, object_ids)
        
        results = []
        for item in items:
            item_data = self.output_schema.from_orm(item).dict()
            item_data['custom_fields'] = custom_values_dict.get(item.pk, [])
            results.append(item_data)
        
        return results

class CustomRetrieveModelView(BaseRetrieveModelView):
    def render_output(self, item, request):
        # Get the model's name from the view's model_class
        model_name = self.__class__.__name__
        
        custom_values_dict = fetch_custom_fields(model_name, [item.pk])
        item_data = self.output_schema.from_orm(item).dict()
        item_data['custom_fields'] = custom_values_dict.get(item.pk, [])
        
        return item_data