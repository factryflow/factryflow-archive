from django.db import models
from django.utils import timezone
from .operationalExceptionTypeModel import OperationalExceptionType
from simple_history.models import HistoricalRecords
from api.utils.modelManager import ActiveManager
from .weeklyShiftTemplateModel import WeeklyShiftTemplate


class OperationalException(models.Model):
    id = models.AutoField(primary_key=True)
    external_id = models.CharField(max_length=250, blank=True, null=True)
    operational_exception_type = models.ForeignKey(OperationalExceptionType, on_delete=models.DO_NOTHING, blank=True, null=True)
    start_datetime = models.DateTimeField(blank=True, null=True)
    end_datetime = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    weekly_shift_template = models.ForeignKey(WeeklyShiftTemplate, on_delete=models.DO_NOTHING, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='operational_exception_history')
    
    objects = ActiveManager()

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'operational_exception'
        indexes = [
            models.Index(fields=['id'])
        ]
