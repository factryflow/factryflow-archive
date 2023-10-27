from collections import defaultdict
from api.models import CustomField, CustomFieldValue

def fetch_custom_fields(model_name, object_ids):
    # Fetch the custom fields for the related model
    custom_fields = CustomField.objects.filter(related_model=model_name)
    
    # Fetch the custom field values based on custom fields and object_ids
    custom_field_values = CustomFieldValue.objects.filter(
        custom_field__in=custom_fields, 
        object_id__in=object_ids
    )
    
    # Organize values by object_id
    custom_values_dict = defaultdict(list)
    for value in custom_field_values:
        custom_values_dict[value.object_id].append(
            {value.custom_field.field_name: value.value}
        )
    return custom_values_dict