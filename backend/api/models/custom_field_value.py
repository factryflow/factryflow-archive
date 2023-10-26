from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from simple_history.models import HistoricalRecords
from api.models.custom_field import CustomField

class CustomFieldValue(models.Model):
    custom_field = models.ForeignKey(CustomField, on_delete = models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete = models.CASCADE)
    value = models.TextField

    class Meta:
        unique_together = ('custom_field', 'content_type', 'object_id')
        db_table = "custom_field_values"
        indexes = [models.Index(fields=["id"])]