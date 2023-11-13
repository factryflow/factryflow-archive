import inspect
from functools import wraps
from typing import Callable, Type

from django.core.exceptions import PermissionDenied
from django.db.models import Model
from ninja_crud.views import AbstractModelView


def get_permission_codename(http_method: str, model: Type[Model]) -> str:
    permission_map = {
        "GET": "view",
        "POST": "add",
        "PUT": "change",
        "PATCH": "change",
        "DELETE": "delete",
    }
    perm_type = permission_map.get(http_method)
    if perm_type is None:
        raise ValueError(f"Unsupported HTTP method: {http_method}")
    return f"{perm_type}_{model._meta.model_name}"


def user_has_model_permission(user, model: Type[Model], http_method: str) -> bool:
    perm_codename = get_permission_codename(http_method, model)
    full_permission = f"{model._meta.app_label}.{perm_codename}"
    return user.has_perm(full_permission)


def require_model_permissions(model: Type[Model]) -> Callable:
    def decorator(view_func: Callable):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if not user_has_model_permission(request.user, model, request.method):
                raise PermissionDenied(
                    f"You do not have permission to access this resource: {model._meta.verbose_name_plural}"
                )
            return view_func(request, *args, **kwargs)

        return _wrapped_view

    return decorator


def apply_permission_check_to_views(viewset):
    # Define the permissions decorator list using the viewset's model_class
    decorators = [require_model_permissions(viewset.model_class)]

    # Loop through all attributes of the viewset
    for attr_name, attr_value in inspect.getmembers(viewset):
        if isinstance(attr_value, AbstractModelView):
            existing_decorators = getattr(attr_value, "decorators", [])
            # Combines existing decorators with the new ones
            attr_value.decorators = decorators + existing_decorators
