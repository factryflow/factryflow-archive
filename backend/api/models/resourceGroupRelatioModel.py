from django.db import models
from django.utils import timezone
from .resourceGroupsModel import ResourceGroups
from .resourcesModel import Resources
from simple_history.models import HistoricalRecords


class ResourceGroupRelation(models.Model):
    id = models.AutoField(primary_key=True)
    resources = models.ForeignKey(Resources, on_delete=models.CASCADE, blank=True, null=True)
    resource_group = models.ForeignKey(ResourceGroups, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='resource_group_rel_history')
    can_delete = models.BooleanField(default=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'resource_group_rel'
        indexes = [
            models.Index(fields=['id'])
        ]
