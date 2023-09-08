from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords


class AssignmentRule(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)
    resource_count = models.IntegerField(blank=True, null=True)
    use_all_resources = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='assignment_rule_history')


    def __str__(self):
        return self.name

    class Meta:
        db_table = 'assignment_rule'
        indexes = [
            models.Index(fields=['id', 'name'])
        ]
