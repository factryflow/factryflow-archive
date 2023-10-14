from django.db.models import Model


def set_many_to_many(
    instance: Model, many_to_many_field_name: str, ids_field_name: str
) -> None:
    if hasattr(instance, many_to_many_field_name) and hasattr(instance, ids_field_name):
        many_to_many_field = getattr(instance, many_to_many_field_name)
        ids_field = getattr(instance, ids_field_name)

        # Assuming you want to set the ManyToManyField using the IDs
        many_to_many_field.set(ids_field)


def post_save_hook(many_to_many_field_name: str, ids_field_name: str):
    """
    Return a pre-save function to set 'created_by', 'updated_by'
    """

    def post_save(request, instance) -> None:
        set_many_to_many(instance, many_to_many_field_name, ids_field_name)

    return post_save
