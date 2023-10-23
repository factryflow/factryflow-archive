from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from api.utils.model_manager import ActiveManager


class OperationalExceptionType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=154)

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_operational_exception_type",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_operational_exception_type",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    history = HistoricalRecords(table_name="operational_exception_type_history")

    objects = ActiveManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "operational_exception_type"
        indexes = [models.Index(fields=["id", "name"])]
