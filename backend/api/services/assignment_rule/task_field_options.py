from django.core.exceptions import FieldDoesNotExist
from django.db import models

from api.models.task import Task


def get_all_field_names_with_types(
    model, related_fields=None, max_depth=2, current_depth=0, prefix=""
):
    """Retrieve string and number field names and their categories of a model, considering specified ForeignKey fields."""

    # Prevent infinite recursion if there's a cycle in the relationships
    if current_depth > max_depth:
        return {}

    # Check field category function
    def field_category(field):
        field_type = type(field)

        if issubclass(field_type, (models.CharField, models.TextField)):
            return "string"
        elif issubclass(
            field_type, (models.IntegerField, models.FloatField, models.DecimalField)
        ):
            return "number"
        return None  # If not string or number

    fields_dict = {
        prefix + field.name: field_category(field)
        for field in model._meta.get_fields()
        if field_category(field) and not field.auto_created
    }

    if related_fields is not None:
        # Check for ForeignKey relationships in related_fields
        for related_field_name in related_fields:
            try:
                field = model._meta.get_field(related_field_name)
                if isinstance(field, models.ForeignKey):
                    related_model = field.related_model
                    new_prefix = prefix + field.name + "."
                    fields_dict.update(
                        get_all_field_names_with_types(
                            related_model,
                            related_fields=related_fields,
                            max_depth=max_depth,
                            current_depth=current_depth + 1,
                            prefix=new_prefix,
                        )
                    )
            except FieldDoesNotExist:
                continue

    return fields_dict


# Usage example
def get_task_fields():
    related_fields = ["task_status", "task_type", "job", "dependencies"]
    model = Task
    all_fields_with_categories = get_all_field_names_with_types(
        model, related_fields=related_fields
    )
    return all_fields_with_categories
