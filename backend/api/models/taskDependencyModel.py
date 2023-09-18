from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from api.utils.modelManager import ActiveManager
from .tasksModel import Tasks
from .dependencyModel import Dependency


class TaskDependency(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Tasks, on_delete=models.CASCADE, blank=True, null=True)
    dependency = models.ForeignKey(Dependency, on_delete=models.CASCADE, related_name="task_dependency", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='task_dependency_history')

    objects = ActiveManager()

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'task_dependency'
        indexes = [
            models.Index(fields=['id'])
        ]
