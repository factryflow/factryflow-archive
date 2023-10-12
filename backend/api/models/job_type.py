from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from api.utils.model_manager import ActiveManager


class JobType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_job_type",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_job_type",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name="job_type_history")

    objects = ActiveManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "job_type"
        indexes = [models.Index(fields=["id", "name"])]
