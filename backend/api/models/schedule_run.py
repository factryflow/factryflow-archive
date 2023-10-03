from django.conf import settings
from django.db import models
from django.utils import timezone
from .user import User
from .schedule_run_status import ScheduleRunStatus
from simple_history.models import HistoricalRecords
from api.utils.model_manager import ActiveManager


class ScheduleRun(models.Model):
    id = models.AutoField(primary_key=True)
    triggered_on = models.DateTimeField(blank=True, null=True)
    triggered_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="triggered_by", blank=True, null=True)
    schedule_status = models.ForeignKey(ScheduleRunStatus, on_delete=models.CASCADE, related_name="schedule_status", blank=True, null=True)
    
    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_schedule_run",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_schedule_run",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='schedule_run_history')

    objects = ActiveManager()
    
    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'schedule_run'
        indexes = [
            models.Index(fields=['id'])
        ]
