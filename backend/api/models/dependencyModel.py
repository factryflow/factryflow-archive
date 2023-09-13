from django.db import models
from django.utils import timezone
from .dependencyTypesModel import DependencyTypes
from .dependencyStatusModel import DependencyStatus
from .jobModel import Jobs
from .tasksModel import Tasks
from simple_history.models import HistoricalRecords
from api.utils.modelManager import ActiveManager

class Dependency(models.Model):
    id = models.AutoField(primary_key=True)
    external_id = models.CharField(max_length=180, blank=True, null=True)
    name = models.CharField(max_length=150)
    dependency_type = models.ForeignKey(DependencyTypes, on_delete=models.DO_NOTHING, blank=True, null=True)
    dependency_status = models.ForeignKey(DependencyStatus, on_delete=models.DO_NOTHING, blank=True, null=True)
    expected_close_datetime = models.DateTimeField(blank=True, null=True)
    actual_close_datetime = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='dependency_history')

    objects = ActiveManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'dependency'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
