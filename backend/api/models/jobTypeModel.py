from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from api.utils.modelManager import ActiveManager


class JobType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='job_type_history')


    objects = ActiveManager()
    
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'job_type'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
