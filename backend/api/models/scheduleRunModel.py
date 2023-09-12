from django.db import models
from django.utils import timezone
from .userModel import User
from simple_history.models import HistoricalRecords
from api.utils.modelManager import ActiveManager


class ScheduleRun(models.Model):
    id = models.AutoField(primary_key=True)
    triggered_on = models.DateTimeField(blank=True, null=True)
    triggered_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="triggered_by", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
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
