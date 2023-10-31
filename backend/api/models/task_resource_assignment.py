from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from api.utils.model_manager import ActiveManager

from .resource import Resource
from .resource_group import ResourceGroup
from .task import Task


class TasksResourceAssignment(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name="resource_assignments",
        blank=True,
        null=True,
    )

    resource_group = models.ForeignKey(
        ResourceGroup,
        on_delete=models.CASCADE,
        related_name="task_assignments",
        blank=True,
        null=True,
    )
    resources = models.ManyToManyField(
        Resource, related_name="task_assignments", blank=True
    )
    use_all_resources = models.BooleanField(default=False)
    resource_count = models.IntegerField(blank=True, null=True)
    is_manual = models.BooleanField(default=False)

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_task_resource_assignment",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_task_resource_assignment",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    history = HistoricalRecords(table_name="tasks_resource_assignment_history")

    objects = ActiveManager()

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "tasks_resource_assignment"
        indexes = [models.Index(fields=["id"])]
