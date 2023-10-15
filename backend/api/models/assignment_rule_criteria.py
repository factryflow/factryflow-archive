from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from .assignment_rule import AssignmentRule
from api.utils.model_manager import ActiveManager


class AssignmentRuleCriteria(models.Model):
    id = models.AutoField(primary_key=True)
    field = models.CharField(max_length=150)
    operator = models.IntegerField(
        blank=True,
        null=True,
        default=1,
        help_text="1. Equals, 2. Add, 3. Subtract, 4. Divide, 5. Multiple",
    )
    value = models.CharField(max_length=254, blank=True, null=True)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)
    assignment_rule = models.ForeignKey(
        AssignmentRule, on_delete=models.CASCADE, blank=True, null=True
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
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name="assignment_rule_criteria_history")

    objects = ActiveManager()

    def __str__(self):
        return self.field

    class Meta:
        db_table = "assignment_rule_criteria"
        indexes = [models.Index(fields=["id", "field"])]
