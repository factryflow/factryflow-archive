from django.conf import settings
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

class CustomField(models.Model):
    FIELD_TYPES = [
        ("text", "Text"),
        ("number", "Number"),
        ("date", "Date"),
        ("boolean", "Boolean"),
        ("datetime", "DateTime"),
        ("time", "Time"),
    ]

    field_name = models.CharField(max_length=255)
    field_type = models.CharField(max_length=50, choices=FIELD_TYPES)
    related_model = models.CharField(max_length=255)

     # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_custom_field",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_custom_field",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    history = HistoricalRecords(table_name="custom_field_history")
    def __str__(self):
        return self.field_name

    class Meta:
        db_table = "custom_fields"
        indexes = [models.Index(fields=["id", "field_name", "related_model"])]