from django.conf import settings
from django.db import models
from django.utils import timezone
from .job import Jobs
from .taskStatus import TaskStatus
from .taskType import TaskType
from simple_history.models import HistoricalRecords
from api.utils.model_manager import ActiveManager


class Tasks(models.Model):
    id = models.AutoField(primary_key=True)
    external_id = models.CharField(max_length=150, blank=True, null=True)
    name = models.CharField(max_length=150)
    task_status = models.ForeignKey(TaskStatus, on_delete=models.CASCADE, related_name="tasks_status", blank=True, null=True)
    task_type = models.ForeignKey(TaskType, on_delete=models.CASCADE, related_name="tasks_type", blank=True, null=True)
    setup_time = models.IntegerField(blank=True, null=True)
    run_time_per_unit = models.IntegerField(blank=True, null=True)
    teardown_time = models.IntegerField(blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    jobs = models.ForeignKey(Jobs, on_delete=models.CASCADE, related_name="tasks_list", blank=True, null=True)
    predecessors = models.ManyToManyField("self", symmetrical=False, related_name="successors", blank=True)
    item = models.CharField(max_length=250, blank=True, null=True)
    planned_start_datetime = models.DateTimeField(blank=True, null=True)
    planned_end_datetime = models.DateTimeField(blank=True, null=True)
    
    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_task",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_task",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='tasks_history')

    objects = ActiveManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'task'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
