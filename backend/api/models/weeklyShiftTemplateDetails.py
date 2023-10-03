from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from .weeklyShiftTemplate import WeeklyShiftTemplate
from api.utils.model_manager import ActiveManager


class WeeklyShiftTemplateDetail(models.Model):
    id = models.AutoField(primary_key=True)
    template = models.ForeignKey(WeeklyShiftTemplate, on_delete=models.CASCADE, related_name="weekly_shift_template_details", blank=True, null=True)
    day_of_week = models.IntegerField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    
    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_weekly_shift_template_detail",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_weekly_shift_template_detail",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='weekly_shift_template_detail_history')
    
    objects = ActiveManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'weekly_shift_template_detail'
        indexes = [
            models.Index(fields=['id'])
        ]
