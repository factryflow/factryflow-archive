from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.services.resources import ResourceService

resource_service = ResourceService()

class ResourcesListView(APIView):
    def get(self, request, format=None):
        """
        List all resources.
        """
        result = resource_service.get_all_resources(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateResourcesView(APIView):
    def post(self, request, format=None):
        """
        Create resources.
        """
        result = resource_service.create_resources(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update resources
        """
        result = resource_service.update_resources(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get resources detail by id
        """
        result = resource_service.get_resource_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete resources detail by id
        """
        result = resource_service.delete_resources(request, id, format=None)
        return Response(result, status=result["code"])
        

class ResourceGroupsListView(APIView):
    def get(self, request, format=None):
        """
        List all resource groups.
        """
        result = resource_service.get_all_resource_groups(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateResourceGroupsView(APIView):
    def post(self, request, format=None):
        """
        Create resource groups.
        """
        result = resource_service.create_resource_groups(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update resource groups.
        """
        result = resource_service.update_resource_groups(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get resource groups. detail by id
        """
        result = resource_service.get_resource_group_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete resource groups. detail by id
        """
        result = resource_service.delete_resource_group(request, id, format=None)
        return Response(result, status=result["code"])
        

