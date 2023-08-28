from api.models import Resources, ResourceGroups
from api.serializers.resources import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.resourceMessages import *
from .resouceBaseService import ResourceBaseService


class ResourceService(ResourceBaseService):
    """
    Create, Retrieve, Update or Delete a resource instance and Return all resource.
    """

    def __init__(self):
        pass

    def get_all_resources(self, request, format=None):
        """
        Retun all the resources
        """
        resource_obj = Resources.objects.all()
        serializer = GetResourcesDetailsSerializer(resource_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_resources(self, request, format=None):
        """
        Create New resources
        """
        serializer = CreateUpdateResourceSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            resource_obj = Resources.objects.get(id=serializer.data["id"])
            serializer = GetResourcesDetailsSerializer(resource_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": RESOURCES_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_resources(self, request, id, format=None):
        """
        Update resources details
        """
        try:
            resource_obj = Resources.objects.get(id=id)
            serializer = CreateUpdateResourceSerializer(resource_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetResourcesDetailsSerializer(resource_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": RESOURCES_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except Resources.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_resource_details_by_id(self, request, id, format=None):
        """
        Get resources details by id
        """
        try:
            resource_obj = Resources.objects.get(id=id)
            serializer = GetResourcesDetailsSerializer(resource_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except Resources.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_resources(self, request, id, format=None):
        """
        delete resources details
        """
        try:
            resource_obj = Resources.objects.get(id=id)
            resource_obj.is_deleted = True
            resource_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":RESOURCES_DELETED})
        except Resources.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    
    def get_all_resource_groups(self, request, format=None):
        """
        Retun all the resources groups
        """
        resource_groups_obj = ResourceGroups.objects.all()
        serializer = GetResourceGroupsDetailsSerializer(resource_groups_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_resource_groups(self, request, format=None):
        """
        Create New resources groups
        """
        serializer = CreateUpdateResourceGroupSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            resource_groups_obj = ResourceGroups.objects.get(id=serializer.data["id"])
            serializer = GetResourceGroupsDetailsSerializer(resource_groups_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": RESOURCE_GROUPS_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_resource_groups(self, request, id, format=None):
        """
        Update resource groups details
        """
        try:
            resource_groups_obj = ResourceGroups.objects.get(id=id)
            serializer = CreateUpdateResourceGroupSerializer(resource_groups_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetResourceGroupsDetailsSerializer(resource_groups_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": RESOURCE_GROUPS_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except ResourceGroups.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_resource_group_details_by_id(self, request, id, format=None):
        """
        Get resource groups details by id
        """
        try:
            resource_groups_obj = ResourceGroups.objects.get(id=id)
            serializer = GetResourceGroupsDetailsSerializer(resource_groups_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except ResourceGroups.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_resource_group(self, request, id, format=None):
        """
        delete resource groups details
        """
        try:
            resource_groups_obj = ResourceGroups.objects.get(id=id)
            resource_groups_obj.is_deleted = True
            resource_groups_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":RESOURCE_GROUPS_DELETED})
        except ResourceGroups.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})