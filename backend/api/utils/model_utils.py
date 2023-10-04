from typing import List, Optional
from django.core.exceptions import FieldError
from django.shortcuts import get_object_or_404
from django.db import models
from django.db.models import Model


def set_created_updated_by(request, instance: 'Model', action: str) -> None:
    """
    Set 'created_by' and 'updated_by' fields based on the action.
    """
    user = request.user
    if action == 'update':
        instance.updated_by = user
    else:
        instance.created_by = user



def set_foreign_keys(instance: Model, field_names: List[str]) -> None:
    """
    Dynamically set foreign keys on the instance based on provided field names.
    """
    for field_name in field_names:
        # Ensure the field is a ForeignKey
        field = instance._meta.get_field(field_name)
        if not isinstance(field, models.ForeignKey):
            raise FieldError(f"'{field_name}' is not a ForeignKey on {instance.__class__.__name__}")

        # Fetch the related model instance and set it
        related_model_id = getattr(instance, f"{field_name}_id", None)
        if related_model_id:
            related_model_class = field.related_model
            related_instance = get_object_or_404(related_model_class, id=related_model_id)
            setattr(instance, field_name, related_instance)




def pre_save_hook(field_names: Optional[List[str]] = None):
    """
    Return a pre-save function to set 'created_by', 'updated_by', and foreign keys.
    """
    def pre_save(request, create_instance, update_instance=None) -> None:
        instance = update_instance or create_instance
        action = 'update' if update_instance else 'create'
        set_created_updated_by(request, instance, action)
        if field_names:
            set_foreign_keys(instance, field_names)
    return pre_save
