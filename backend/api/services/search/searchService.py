from api.models import Tasks, Job, ResourceGroups, Resources
from api.serializers.tasks import *
from api.serializers.job import *
from api.serializers.resources import *
from rest_framework import status
from api.utils.searchData import search_data
from api.utils.messages.commonMessages import *
from api.utils.messages.taskMessages import *
from .searchBaseService import SearchBaseService


class SearchService(SearchBaseService):
    """
    Create, Retrieve, Update or Delete a search_data instance and Return all search_datas.
    """

    def __init__(self):
        pass

    def get_all_search_list(self, request, format=None):
        """
        Retun all the search_datas
        """
        job_obj = Job.objects.all()
        task_obj = Tasks.objects.all()
        resource_obj = Resources.objects.all()
        resource_group_obj = ResourceGroups.objects.all()
        search_keys=['id__icontains', 'name__icontains']
        search_type='or' 
        jobs = search_data(request, search_keys, search_type, GetSearchJobDetailsSerializer, job_obj).data
        tasks = search_data(request, search_keys, search_type, GetSearchTaskDetailsSerializer, task_obj).data
        resource = search_data(request, search_keys, search_type, GetSearchResourcesDetailsSerializer, resource_obj).data
        resource_group = search_data(request, search_keys, search_type, GetSearchResourceGroupsDetailsSerializer, resource_group_obj).data
        return_data = {}
        
        if len(jobs) > 0:
            return_data["jobs"] = jobs
            
        if len(tasks) > 0:
            return_data["tasks"] = tasks
            
        if len(resource) > 0:
            return_data["resource"] = resource
            
        if len(resource_group) > 0:
            return_data["resource_group"] = resource_group
        
        return ({"data": return_data, "code": status.HTTP_200_OK, "message": OK})
    
    
    def get_search_data_details(self, request, format=None):
        """Get Search data details"""
        search_type = request.data.get("type")
        if search_type == "job":
            model = Job
            serializers = GetJobsDetailsSerializer
        elif search_type == "task":
            model = Tasks
            serializers = GetTaskDetailsSerializer
        elif search_type == "resource":
            model = Resources
            serializers = GetResourcesDetailsSerializer
        else:
            model = ResourceGroups
            serializers = GetResourceGroupsDetailsSerializer
            
        
        try:
            data_obj = model.objects.get(id=request.data.get("id"))
            serializer = serializers(data_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except model.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})