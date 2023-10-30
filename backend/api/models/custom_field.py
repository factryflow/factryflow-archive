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
    ]

    field_name = models.CharField(max_length=255)
    field_type = models.CharField(max_length=50, choices=FIELD_TYPES)
    label = models.CharField(max_length=255, null=True, blank=True)
    validation = models.JSONField(null=True, blank=True)
    style = models.JSONField(null=True, blank=True)

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

    @property
    def value_id_list(self):
        return list(self.values.values_list("id", flat=True))
    
    @property
    def custom_field_values(self):
        return [
            {
                "id": value.id, 
                "value": value.value, 
                "object_id" : value.object_id
            } for value in self.values.all()
        ]

    class Meta:
        db_table = "custom_fields"
        indexes = [models.Index(fields=["id", "field_name"])]