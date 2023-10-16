from typing import Tuple

from django.db.models import Model


def set_m2m_relations_from_ids(
    instance: Model, many_to_many_field_name: str, ids_field_name: str
) -> None:
    """
    Set values of a ManyToManyField using given IDs.
    """
    if hasattr(instance, many_to_many_field_name) and hasattr(instance, ids_field_name):
        many_to_many_relation = getattr(instance, many_to_many_field_name)
        ids_field = getattr(instance, ids_field_name)

        # Assuming you want to set the ManyToManyField using the IDs
        many_to_many_relation.set(ids_field)


def set_reverse_fk_relations_from_ids(
    instance: Model, reverse_relation_name: str, ids_field_name: str
) -> None:
    """
    Set values of a reverse ForeignKey using given IDs in a generic way.
    """
    if hasattr(instance, reverse_relation_name) and hasattr(instance, ids_field_name):
        # This is the manager for the related model (e.g., Task.objects for a Job instance)
        related_model_manager = getattr(instance, reverse_relation_name).model.objects
        ids_field = getattr(instance, ids_field_name)

        # Get the name of the ForeignKey field in the related model (e.g., "job" for Task model)
        fk_field_name = getattr(instance, reverse_relation_name).field.name

        # Using the manager to fetch tasks regardless of their current ForeignKey relationship
        related_model_manager.filter(id__in=ids_field).update(
            **{fk_field_name: instance}
        )


def post_save_hook(*relationship_configs: Tuple[str, str, str]):
    """
    Return a post-save function to set relations based on relationship type.
    Each config consists of (relationship_type, relation_field_name, ids_field_name).
    """

    def post_save(request, instance) -> None:
        for (
            relationship_type,
            relation_field_name,
            ids_field_name,
        ) in relationship_configs:
            if relationship_type == "m2m":
                set_m2m_relations_from_ids(
                    instance, relation_field_name, ids_field_name
                )
            elif relationship_type == "reverse_fk":
                print("reverse_fk")
                set_reverse_fk_relations_from_ids(
                    instance, relation_field_name, ids_field_name
                )
            else:
                # Handle potential unsupported relationship types
                raise ValueError(f"Unsupported relationship type: {relationship_type}")

    return post_save
