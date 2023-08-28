from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords


class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='roles_history')
    can_delete = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'roles'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
