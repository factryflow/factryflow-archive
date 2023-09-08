from django.db import models
from django.utils import timezone
from .jobModel import Jobs
from simple_history.models import HistoricalRecords


class Tasks(models.Model):
    id = models.AutoField(primary_key=True)
    external_id = models.CharField(max_length=150, blank=True, null=True)
    name = models.CharField(max_length=150)
    task_status = models.IntegerField(blank=True, null=True, help_text="1. Not Planned, 2. Planned, 3. Ready to start, 4. In Progress, 5. Completed")
    setup_time = models.IntegerField(blank=True, null=True)
    run_time_per_unit = models.IntegerField(blank=True, null=True)
    teardown_time = models.IntegerField(blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    jobs = models.ForeignKey(Jobs, on_delete=models.CASCADE, related_name="tasks_list", blank=True, null=True)
    predecessors = models.ManyToManyField("self", symmetrical=False, related_name="successors", blank=True)
    item = models.CharField(max_length=250, blank=True, null=True)
    planned_start_datetime = models.DateTimeField(blank=True, null=True)
    planned_end_datetime = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='tasks_history')


    def __str__(self):
        return self.name

    class Meta:
        db_table = 'task'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
