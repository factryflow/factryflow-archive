from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from api.utils.model_manager import ActiveManager

from .weekly_shift_template import WeeklyShiftTemplate


class Resource(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    weekly_shift_template = models.ForeignKey(
        WeeklyShiftTemplate,
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        related_name="resources",
    )
    resource_groups = models.ManyToManyField("ResourceGroup", related_name="resources")

    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_resources",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_resources",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    history = HistoricalRecords(table_name="resource_history")

    objects = ActiveManager()

    @property
    def resource_group_id_list(self):
        return list(self.resource_groups.values_list("id", flat=True))

    class Meta:
        db_table = "resource"
        indexes = [models.Index(fields=["id", "name"])]
