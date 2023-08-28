from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords


class ResourceGroups(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    resources_list = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='resource_groups_history')
    

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'resource_groups'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
