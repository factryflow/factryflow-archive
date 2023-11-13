from django.contrib.auth.models import AbstractUser
from django.db import models

from api.models.resource import Resource


class User(AbstractUser):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_send_time = models.DateTimeField(blank=True, null=True)
    resources = models.ManyToManyField(Resource, related_name="users")
