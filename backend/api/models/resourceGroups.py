from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from api.utils.model_manager import ActiveManager


class ResourceGroups(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    resources_list = models.JSONField(blank=True, null=True)
    
    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_resource_group",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_resource_group",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='resource_group_history')
    
    objects = ActiveManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'resource_group'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
