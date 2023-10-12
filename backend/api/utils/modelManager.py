from django.db import models
from django.contrib.auth.models import BaseUserManager


class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)
