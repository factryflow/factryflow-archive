from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from api.models.job import Job
from api.models.task_status import TaskStatus
from api.models.task_type import TaskType
from api.models.work_center import WorkCenter
from api.utils.model_manager import ActiveManager


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    external_id = models.CharField(max_length=150, blank=True)
    name = models.CharField(max_length=150)
    task_status = models.ForeignKey(
        TaskStatus, on_delete=models.CASCADE, related_name="tasks_status"
    )
    task_type = models.ForeignKey(
        TaskType, on_delete=models.CASCADE, related_name="tasks_type"
    )
    setup_time = models.IntegerField(blank=True, null=True, default=0)
    run_time_per_unit = models.IntegerField(blank=True, null=True)
    teardown_time = models.IntegerField(default=0)
    quantity = models.IntegerField(default=1)
    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name="tasks", blank=True, null=True
    )
    work_center = models.ForeignKey(
        WorkCenter, on_delete=models.DO_NOTHING, related_name="tasks", default=1
    )
    predecessors = models.ManyToManyField(
        "self", symmetrical=False, related_name="successors", blank=True
    )
    item = models.CharField(max_length=250, blank=True, null=True)
    planned_start_datetime = models.DateTimeField(blank=True, null=True)
    planned_end_datetime = models.DateTimeField(blank=True, null=True)
    dependencies = models.ManyToManyField("Dependency", related_name="tasks")

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

    history = HistoricalRecords(table_name="tasks_history")

    objects = ActiveManager()

    @property
    def predecessor_id_list(self):
        return list(self.predecessors.values_list("id", flat=True))

    @property
    def successor_id_list(self):
        return list(self.successors.values_list("id", flat=True))

    @property
    def dependency_id_list(self):
        return list(self.dependencies.values_list("id", flat=True))

    @property
    def resource_assignment_id_list(self):
        return list(self.resource_assignments.values_list("id", flat=True))

    def __str__(self):
        return self.name

    class Meta:
        db_table = "task"
        indexes = [models.Index(fields=["id", "name"])]
