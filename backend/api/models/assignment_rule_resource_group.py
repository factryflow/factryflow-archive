from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from .assignment_rule import AssignmentRule
from .resource_group import ResourceGroups
from api.utils.model_manager import ActiveManager


class AssignmentRuleResourceGroup(models.Model):
    id = models.AutoField(primary_key=True)
    assignment = models.ForeignKey(
        AssignmentRule,
        on_delete=models.CASCADE,
        related_name="assignment_resource_ids",
        blank=True,
        null=True,
    )
    resource = models.ForeignKey(
        ResourceGroups,
        on_delete=models.CASCADE,
        related_name="resource_assignment_ids",
        blank=True,
        null=True,
    )

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_assignment_rule_resource_group",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_assignment_rule_resource_group",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name="assignment_rule_resource_group_history")

    objects = ActiveManager()

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "assignment_rule_resource_group"
        indexes = [models.Index(fields=["id"])]
