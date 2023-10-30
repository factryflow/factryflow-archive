from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from simple_history.models import HistoricalRecords
from api.models.custom_field import CustomField
from django.contrib.contenttypes.fields import GenericRelation
from django.apps import apps
from django.core.exceptions import ValidationError

# This is added to validate if the related_model field value is an existing model
def validate_related_model(value):
    try:
        apps.get_model('api', value)
    except LookupError:
        raise ValidationError(f"'{value}' is not a valid model in the app.") 

class CustomFieldValue(models.Model):
    custom_field = models.ForeignKey(CustomField, on_delete = models.DO_NOTHING, related_name= "values")
    object_id = models.PositiveIntegerField()
    related_model = models.CharField(max_length=255, blank=True, null= True, validators=[validate_related_model])
    value = models.TextField()

    class Meta:
        unique_together = ('custom_field', 'object_id', 'related_model')
        db_table = "custom_field_values"
        indexes = [models.Index(fields=["id"])]

# For CustomFieldMixin
class CustomFieldMixin: 
    custom_field_values = GenericRelation(CustomFieldValue)

    def set_custom_field_value(self, field_name, value):
        custom_field = CustomField.objects.get(field_name=field_name)
        related_model = self.__class__.__name__
        CustomFieldValue.objects.update_or_create(
            custom_field=custom_field,
            related_model=related_model,
            object_id=self.pk,
            defaults={'value': value}
        )

    def get_custom_field_value(self, field_name):
        custom_field = CustomField.objects.get(field_name=field_name)
        related_model = self.__class__.__name__
        custom_field_value = CustomFieldValue.objects.get(
            custom_field=custom_field,
            related_model=related_model,
            object_id=self.id,
        )
        return custom_field_value.value

    @property
    def custom_values(self):
        related_model = self.__class__.__name__
        custom_field_values = CustomFieldValue.objects.filter(related_model=related_model, object_id=self.pk)
        
        custom_values_list = [
            {
                "field_name": value.custom_field.field_name,
                "value": value.value
            } for value in custom_field_values
        ]
        return custom_values_list


