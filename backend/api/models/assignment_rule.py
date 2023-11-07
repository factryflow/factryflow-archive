from django.conf import settings
from django.db import models
from django.utils import timezone
from ordered_model.models import OrderedModelBase
from simple_history.models import HistoricalRecords

from api.models.work_center import WorkCenter


class AssignmentRule(OrderedModelBase):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    priority = models.PositiveIntegerField(editable=False, db_index=True)
    order_field_name = "priority"
    order_with_respect_to = "work_center"
    work_center = models.ForeignKey(WorkCenter, on_delete=models.DO_NOTHING, default=1)
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

    # objects = ActiveManager()

    def __str__(self):
        return self.name

    @property
    def task_id_list(self):
        return list(self.tasks.values_list("id", flat=True))

    def criteria_id_list(self):
        return list(self.criteria.values_list("id", flat=True))

    class Meta:
        db_table = "assignment_rule"
        indexes = [models.Index(fields=["id", "name"])]
        ordering = ("priority",)
