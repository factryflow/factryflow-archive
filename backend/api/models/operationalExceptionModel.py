from django.db import models
from django.utils import timezone
from .operationalExceptionTypeModel import OperationalExceptionType
from simple_history.models import HistoricalRecords


class OperationalException(models.Model):
    id = models.AutoField(primary_key=True)
    exception_type = models.ForeignKey(OperationalExceptionType, on_delete=models.DO_NOTHING, blank=True, null=True)
    start_datetime = models.DateTimeField(blank=True, null=True)
    end_datetime = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='operational_exception_history')
    

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'operational_exception'
        indexes = [
            models.Index(fields=['id'])
        ]
