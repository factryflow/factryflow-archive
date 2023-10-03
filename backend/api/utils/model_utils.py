from api.models import *
import json

def set_created_updated_by_on_create(request, instance):
    """
    Set created_by and updated_by fields for the model instance during creation.

    :param request: HttpRequest object
    :param instance: Instance of the model being created
    """
    user = request.user
    instance.created_by = user
    instance.updated_by = user


def set_updated_by_on_update(request, old_instance, new_instance):
    """
    Set updated_by field for the model instance during update.

    :param request: HttpRequest object
    :param old_instance: Instance of the model before update
    :param new_instance: Instance of the model after update
    """
    user = request.user
    new_instance.updated_by = user


def set_job_foreign_keys_on_create(request, instance):
    """
    Set created_by and updated_by fields for the model instance during creation.

    :param request: HttpRequest object
    :param instance: Instance of the model being created
    """
    data = json.loads(request.body)
    try:
        job_type = JobType.objects.get(id=data.get("job_type"))
    except JobType.DoesNotExist:
        job_type = None
    
    try:
        job_status = JobStatus.objects.get(id=data.get("job_status"))
    except JobStatus.DoesNotExist:
        job_status = None
        
    user = request.user
    instance.created_by = user
    instance.updated_by = user
    instance.job_type = job_type
    instance.job_status = job_status
     

def set_job_foreign_keys_on_update(request, old_instance, new_instance):
    """
    Set updated_by field for the model instance during update.

    :param request: HttpRequest object
    :param old_instance: Instance of the model before update
    :param new_instance: Instance of the model after update
    """
    data = json.loads(request.body)
    try:
        job_type = JobType.objects.get(id=data.get("job_type"))
    except JobType.DoesNotExist:
        job_type = None
    
    try:
        job_status = JobStatus.objects.get(id=data.get("job_status"))
    except JobStatus.DoesNotExist:
        job_status = None
    user = request.user
    new_instance.updated_by = user
    new_instance.job_type = job_type
    new_instance.job_status = job_status