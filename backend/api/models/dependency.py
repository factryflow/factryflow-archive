from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from api.models.dependency_status import DependencyStatus
from api.models.dependency_types import DependencyTypes
from api.utils.model_manager import ActiveManager


class Dependency(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    external_id = models.CharField(max_length=180, blank=True, null=True)
    expected_close_datetime = models.DateTimeField(blank=True, null=True)
    actual_close_datetime = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    dependency_type = models.ForeignKey(DependencyTypes, on_delete=models.DO_NOTHING)
    dependency_status = models.ForeignKey(DependencyStatus, on_delete=models.DO_NOTHING)

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_dependency",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_dependency",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    history = HistoricalRecords(table_name="dependency_history")

    objects = ActiveManager()

    @property
    def job_id_list(self):
        return list(self.jobs.values_list("id", flat=True))

    @property
    def task_id_list(self):
        return list(self.tasks.values_list("id", flat=True))

    def __str__(self):
        return self.name

    class Meta:
        db_table = "dependency"
        indexes = [models.Index(fields=["id", "name"])]
