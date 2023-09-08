from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from .assignmentRuleModel import AssignmentRule
from .resourceGroupsModel import ResourceGroups

class AssignmentRuleResourceGroup(models.Model):
    id = models.AutoField(primary_key=True)
    assignment = models.ForeignKey(AssignmentRule, on_delete=models.CASCADE, related_name="assignment_resource_ids", blank=True, null=True)
    resource = models.ForeignKey(ResourceGroups, on_delete=models.CASCADE, related_name="resource_assignment_ids", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='assignment_rule_resource_group_history')


    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'assignment_rule_resource_group'
        indexes = [
            models.Index(fields=['id'])
        ]
