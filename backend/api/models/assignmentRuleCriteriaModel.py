from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from .assignmentRuleModel import AssignmentRule
from api.utils.modelManager import ActiveManager

class AssignmentRuleCriteria(models.Model):
    id = models.AutoField(primary_key=True)
    field = models.CharField(max_length=150)
    operator = models.IntegerField(blank=True, null=True)
    value = models.CharField(max_length=254, blank=True, null=True)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)
    assignment_rule = models.ForeignKey(AssignmentRule, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='assignment_rule_criteria_history')

    objects = ActiveManager()

    def __str__(self):
        return self.field

    class Meta:
        db_table = 'assignment_rule_criteria'
        indexes = [
            models.Index(fields=['id', 'field'])
        ]
