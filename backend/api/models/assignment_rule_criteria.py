from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from api.utils.model_manager import ActiveManager

from .assignment_rule import AssignmentRule


class Operator(models.TextChoices):
    EQUALS = "equals", "Equals"
    CONTAINS = "contains", "Contains"
    STARTS_WITH = "starts_with", "Starts With"
    ENDS_WITH = "ends_with", "Ends With"
    GREATER_THAN = "gt", "Greater Than"
    LESS_THAN = "lt", "Less Than"


class AssignmentRuleCriteria(models.Model):
    id = models.AutoField(primary_key=True)
    field = models.CharField(max_length=100)
    operator = models.CharField(
        max_length=20, choices=Operator.choices, default=Operator.EQUALS
    )
    value = models.CharField(max_length=254, blank=True, null=True)

    # parent = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True) # for nested rules

    assignment_rule = models.ForeignKey(
        AssignmentRule,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="criteria",
    )

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_assignment_rule_criteria",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_assignment_rule_criteria",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    history = HistoricalRecords(table_name="assignment_rule_criteria_history")

    objects = ActiveManager()

    def __str__(self):
        return self.field

    class Meta:
        db_table = "assignment_rule_criteria"
        indexes = [models.Index(fields=["id", "field"])]
