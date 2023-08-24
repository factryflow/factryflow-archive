from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from .userModel import User


class UserSession(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    device_id = models.CharField(max_length=100, null = True, blank= True)
    token = models.CharField(max_length=560, null = True, blank= True)
    device_type = models.CharField(max_length=20,  null = True, blank= True)
    app_version = models.CharField(max_length=60, null= True, blank= True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords(table_name='user_session_history')

    def __str__(self):
        return str(self.user_id)

    class Meta:
        db_table = 'user_session'
        indexes = [
            models.Index(fields=['id'])
        ]
