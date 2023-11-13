from django.apps import apps
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Create "Admin", "Planner", and "Read-Only" groups with specific permissions'

    def add_permissions_to_group(self, group, permissions):
        # Clear all existing permissions to reset them
        group.permissions.clear()

        for permission in permissions:
            group.permissions.add(permission)
            self.stdout.write(
                self.style.SUCCESS(
                    f'Assigned "{permission.codename}" to "{group.name}" group'
                )
            )

    def create_or_update_group(self, group_name, permissions):
        group, created = Group.objects.get_or_create(name=group_name)
        action = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f'{action} group "{group_name}"'))
        self.add_permissions_to_group(group, permissions)

    def get_app_permissions(self, app_label, exclude=None):
        app_models = apps.get_app_config(app_label).get_models()
        app_content_types = ContentType.objects.get_for_models(*app_models).values()
        permissions = Permission.objects.filter(content_type__in=app_content_types)

        if exclude:
            permissions = permissions.exclude(codename__in=exclude)

        return permissions

    def handle(self, *args, **options):
        # Get all permissions for the 'api' app
        all_permissions = self.get_app_permissions("api")

        # Get permissions without those related to User management
        planner_permissions = self.get_app_permissions(
            "api", exclude=["add_user", "change_user", "delete_user"]
        )

        # Define permissions for each group
        groups_config = {
            "Admin": all_permissions,
            "Planner": planner_permissions,
            "Read-Only": all_permissions.filter(codename__startswith="view_"),
        }

        # Create or update groups based on the configuration
        for group_name, permissions in groups_config.items():
            self.create_or_update_group(group_name, permissions)
