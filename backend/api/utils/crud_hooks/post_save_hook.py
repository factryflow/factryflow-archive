from typing import Tuple

from django.db.models import Model


def set_m2m_relations_from_ids(
    instance: Model, many_to_many_field_name: str, ids_field_name: str
) -> None:
    """
    Set values of a ManyToManyField using given IDs.
    """
    if hasattr(instance, many_to_many_field_name) and hasattr(instance, ids_field_name):
        many_to_many_field = getattr(instance, many_to_many_field_name)
        ids_field = getattr(instance, ids_field_name)

        # Assuming you want to set the ManyToManyField using the IDs
        many_to_many_field.set(ids_field)


def post_save_hook(*field_pairs: Tuple[str, str]):
    """
    Return a post-save function to set multiple ManyToMany fields.
    Each pair consists of (many_to_many_field_name, ids_field_name).
    """

    def post_save(request, instance) -> None:
        for many_to_many_field_name, ids_field_name in field_pairs:
            set_m2m_relations_from_ids(
                instance, many_to_many_field_name, ids_field_name
            )

    return post_save
