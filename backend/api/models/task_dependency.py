from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from api.utils.model_manager import ActiveManager
from .task import Tasks
from .dependency import Dependency


class TaskDependency(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Tasks, on_delete=models.CASCADE, blank=True, null=True)
    dependency = models.ForeignKey(
        Dependency,
        on_delete=models.CASCADE,
        related_name="task_dependency",
        blank=True,
        null=True,
    )

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_task_dependency",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_task_dependency",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name="task_dependency_history")

    objects = ActiveManager()

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "task_dependency"
        indexes = [models.Index(fields=["id"])]
