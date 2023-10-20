from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from api.utils.model_manager import ActiveManager


class AssignmentRule(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)
    resource_count = models.IntegerField(blank=True, null=True)
    use_all_resources = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_assignment_rule",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_assignment_rule",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    history = HistoricalRecords(table_name="assignment_rule_history")

    objects = ActiveManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "assignment_rule"
        indexes = [models.Index(fields=["id", "name"])]
