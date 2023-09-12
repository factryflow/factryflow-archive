from django.db import models
from django.utils import timezone
from .tasksModel import Tasks
from .resourcesModel import Resources
from simple_history.models import HistoricalRecords
from api.utils.modelManager import ActiveManager


class TasksResourceAssignment(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Tasks, on_delete=models.CASCADE, related_name="task_assignment", blank=True, null=True)
    resource = models.ForeignKey(Resources, on_delete=models.CASCADE, related_name="resource_assignment", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='tasks_resource_assignment_history')

    objects = ActiveManager()
    
    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'tasks_resource_assignment'
        indexes = [
            models.Index(fields=['id'])
        ]
