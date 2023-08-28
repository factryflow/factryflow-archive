from django.db import models
from django.utils import timezone
from .dependencyTypesModel import DependencyTypes
from .jobModel import Jobs
from .tasksModel import Tasks
from simple_history.models import HistoricalRecords


class Dependency(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    dependency_type = models.ForeignKey(DependencyTypes, on_delete=models.DO_NOTHING, blank=True, null=True)
    dependency_status = models.IntegerField(blank=True, null=True, help_text="1. Pending, 2. In Progress, 3. Closed, 4. Canceled")
    expected_closed = models.DateTimeField(blank=True, null=True)
    closed_date = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    jobs = models.ForeignKey(Jobs, on_delete=models.CASCADE, related_name="dependency_list")
    tasks = models.ForeignKey(Tasks, on_delete=models.CASCADE, related_name="task_dependency")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='dependency_history')


    def __str__(self):
        return self.name

    class Meta:
        db_table = 'dependency'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
