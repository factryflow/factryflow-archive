from typing import Callable, Dict, Tuple

from django.db.models import Model


class PostSaveActions:
    def __init__(self):
        self.actions: Dict[str, Callable] = {
            "m2m": self._set_m2m_relations_from_ids,
            "reverse_fk": self._set_reverse_fk_relations_from_ids,
        }

    def register(self, action_type: str, action: Callable) -> None:
        """Register a new post-save action."""
        self.actions[action_type] = action

    def get(self, action_type: str) -> Callable:
        """Retrieve a registered post-save action."""
        return self.actions.get(action_type)

    def _set_m2m_relations_from_ids(
        self, instance: Model, relation_field_name: str, ids_field_name: str
    ) -> None:
        """
        Set values of a ManyToManyField using given IDs.
        """
        if hasattr(instance, relation_field_name) and hasattr(instance, ids_field_name):
            many_to_many_relation = getattr(instance, relation_field_name)
            ids_field = getattr(instance, ids_field_name)

            # Assuming you want to set the ManyToManyField using the IDs
            many_to_many_relation.set(ids_field)

    def _set_reverse_fk_relations_from_ids(
        self, instance: Model, relation_field_name: str, ids_field_name: str
    ) -> None:
        """
        Set values of a reverse ForeignKey using given IDs in a generic way.
        """
        if hasattr(instance, relation_field_name) and hasattr(instance, ids_field_name):
            # This is the manager for the related model (e.g., Task.objects for a Job instance)
            related_model_manager = getattr(instance, relation_field_name).model.objects
            ids_field = getattr(instance, ids_field_name)

            # Get the name of the ForeignKey field in the related model (e.g., "job" for Task model)
            fk_field_name = getattr(instance, relation_field_name).field.name

            # Using the manager to fetch tasks regardless of their current ForeignKey relationship
            related_model_manager.filter(id__in=ids_field).update(
                **{fk_field_name: instance}
            )


def post_save_hook(
    *action_configs: Tuple[str, ...],
    actions_obj: PostSaveActions = PostSaveActions(),  # Default to using PostSaveActions
):
    def post_save(request, instance) -> None:
        for config in action_configs:
            action_type, *action_args = config
            action = actions_obj.get(action_type)
            if action:
                action(instance, *action_args)  # Unpack the arguments directly
            else:
                raise ValueError(f"Unsupported action type: {action_type}")

    return post_save
