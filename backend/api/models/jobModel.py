from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords


class Jobs(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    priority = models.IntegerField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    customer = models.CharField(max_length=250, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    note = models.CharField(max_length=150, blank=True, null=True)
    planned_start = models.DateTimeField(blank=True, null=True)
    planned_end = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='job_history')
    

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'job'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
