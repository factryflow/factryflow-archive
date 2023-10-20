from django.conf import settings
from django.db import models
from django.utils import timezone
from ordered_model.models import OrderedModelBase
from simple_history.models import HistoricalRecords

from api.models.job_status import JobStatus
from api.models.job_type import JobType


class Job(OrderedModelBase):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    customer = models.CharField(max_length=250, blank=True)
    due_date = models.DateField(blank=True, null=True)
    priority = models.PositiveIntegerField(editable=False, db_index=True)
    order_field_name = "priority"
    planned_start_datetime = models.DateTimeField(null=True, blank=True)
    planned_end_datetime = models.DateTimeField(null=True, blank=True)
    external_id = models.CharField(max_length=150, blank=True)
    note = models.CharField(max_length=150, blank=True)
    job_status = models.ForeignKey(JobStatus, on_delete=models.DO_NOTHING)
    job_type = models.ForeignKey(JobType, on_delete=models.DO_NOTHING)
    dependencies = models.ManyToManyField("Dependency", related_name="jobs")

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_job",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_job",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name="job_history")

    # objects = ActiveManager()

    @property
    def task_id_list(self):
        return list(self.tasks.values_list("id", flat=True))

    @property
    def dependency_id_list(self):
        return list(self.dependencies.values_list("id", flat=True))

    def __str__(self):
        return self.name

    class Meta:
        db_table = "job"
        indexes = [models.Index(fields=["id", "name"])]
        ordering = ("priority",)
