from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from api.utils.modelManager import ActiveManager
from .jobModel import Jobs
from .dependencyModel import Dependency


class JobDependency(models.Model):
    id = models.AutoField(primary_key=True)
    job = models.ForeignKey(Jobs, on_delete=models.CASCADE, blank=True, null=True)
    job_type = models.ForeignKey(Dependency, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='job_dependency_history')

    objects = ActiveManager()

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'job_dependency'
        indexes = [
            models.Index(fields=['id'])
        ]
