from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from api.utils.model_manager import ActiveManager

from .operational_exception_type import OperationalExceptionType
from .weekly_shift_template import WeeklyShiftTemplate


class OperationalException(models.Model):
    id = models.AutoField(primary_key=True)
    external_id = models.CharField(max_length=250, blank=True, null=True)
    operational_exception_type = models.ForeignKey(
        OperationalExceptionType, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    start_datetime = models.DateTimeField(blank=True, null=True)
    end_datetime = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    weekly_shift_template = models.ForeignKey(
        WeeklyShiftTemplate, on_delete=models.DO_NOTHING, blank=True, null=True
    )

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_operational_exception",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_operational_exception",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    history = HistoricalRecords(table_name="operational_exception_history")

    objects = ActiveManager()

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "operational_exception"
        indexes = [models.Index(fields=["id"])]
