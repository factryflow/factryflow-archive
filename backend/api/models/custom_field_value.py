from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from simple_history.models import HistoricalRecords
from api.models.custom_field import CustomField
from django.contrib.contenttypes.fields import GenericRelation

class CustomFieldValue(models.Model):
    custom_field = models.ForeignKey(CustomField, on_delete = models.DO_NOTHING, related_name= "values")
    object_id = models.PositiveIntegerField()
    value = models.TextField()

    class Meta:
        unique_together = ('custom_field', 'object_id')
        db_table = "custom_field_values"
        indexes = [models.Index(fields=["id"])]

# For CustomFieldMixin
class CustomFieldMixin: 
    custom_field_values = GenericRelation(CustomFieldValue)
    def set_custom_field_value(self, field_name, value):
        custom_field = CustomField.objects.get(field_name=field_name, related_model=self.__class__.__name__)
        CustomFieldValue.objects.update_or_create(
            custom_field=custom_field,
            object_id=self.pk,
            value= value
        ) 
    def get_custom_field_value(self, field_name):
        custom_field = CustomField.objects.get(field_name=field_name, related_model=self.__class__.__name__)
        custom_field_value = CustomFieldValue.objects.get(
            custom_field=custom_field,
            object_id=self.id,
        )
        return custom_field_value.value