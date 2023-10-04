from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from api.models.job_status import JobStatus
from api.models.job_type import JobType
from api.utils.model_manager import ActiveManager


class Job(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    customer = models.CharField(max_length=250, blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)
    planned_start_datetime = models.DateTimeField(blank=True, null=True)
    planned_end_datetime = models.DateTimeField(blank=True, null=True)
    external_id = models.CharField(max_length=150, blank=True, null=True)
    note = models.CharField(max_length=150, blank=True, null=True)
    job_status = models.ForeignKey(JobStatus, on_delete=models.DO_NOTHING)
    job_type = models.ForeignKey(JobType, on_delete=models.DO_NOTHING)
    
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
    history = HistoricalRecords(table_name='job_history')
    
    objects = ActiveManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'job'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
