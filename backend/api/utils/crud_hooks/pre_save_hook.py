from typing import List, Optional

from django.db.models import Model


def set_created_updated_by(request, instance: "Model", action: str) -> None:
    """
    Set 'created_by' and 'updated_by' fields based on the action.
    """
    user = request.user
    if action == "update":
        instance.updated_by = user
    else:
        instance.created_by = user


def pre_save_hook(field_names: Optional[List[str]] = None):
    """
    Return a pre-save function to set 'created_by', 'updated_by'
    """

    def pre_save(request, create_instance, update_instance=None) -> None:
        instance = update_instance or create_instance
        action = "update" if update_instance else "create"
        set_created_updated_by(request, instance, action)

    return pre_save
