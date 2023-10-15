from django.db import models


class ActiveManager(models.Manager):
    """
    This is the Model manager where are get the records which is not deleted.
    """
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)
