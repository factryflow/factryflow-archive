from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.utils.schemas import *
from drf_yasg.utils import swagger_auto_schema

from api.services.resources import ResourceService

resource_service = ResourceService()


class GetCreateResourcesView(APIView):
    @swagger_auto_schema(
        request_body=create_update_resources_request_body,
        responses=response_create_update_resources,
        operation_summary="create reources",
    )
    def post(self, request, format=None):
        """
        Create resources.
        """
        result = resource_service.create_resources(request, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=resources_details_response,
        operation_summary="get resources details list",
    )
    def get(self, request, format=None):
        """
        List all resources.
        """
        result = resource_service.get_all_resources(request, format=None)
        return Response(result, status=result["code"])

class GetUpdateDeleteResourcesView(APIView):
    @swagger_auto_schema(
        request_body=create_update_resources_request_body,
        responses=response_create_update_resources,
        operation_summary="update reources",
    )

    def put(self, request, id, format=None):
        """
        Update resources
        """
        result = resource_service.update_resources(request, id, format=None)
        return Response(result, status=result["code"])

    @swagger_auto_schema(
        responses=resources_details_response,
        operation_summary="get resources details by id",
    )
    
    def get(self, request, id, format=None):
        """
        get resources detail by id
        """
        result = resource_service.get_resource_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    
    @swagger_auto_schema(
        responses=response_delete_resources,
        operation_summary="delete resource",
    )
    
    def delete(self, request, id, format=None):
        """
        delete resources detail by id
        """
        result = resource_service.delete_resources(request, id, format=None)
        return Response(result, status=result["code"])
    
        

class ResourcesGroupsCreateListView(APIView):
    @swagger_auto_schema(
        responses=resources_groups_details_response,
        operation_summary="get resources groups details list",
    )
    def get(self, request, format=None):
        """
        List all resource groups.
        """
        result = resource_service.get_all_resource_groups(request, format=None)
        return Response(result, status=result["code"])

    @swagger_auto_schema(
        request_body=create_update_resources_groups_request_body,
        responses=response_create_update_resources_groups,
        operation_summary="create reources groups",
    )
    def post(self, request, format=None):
        """
        Create resource groups.
        """
        result = resource_service.create_resource_groups(request, format=None)
        return Response(result, status=result["code"])


class GetUpdateDeleteResourceGroupsView(APIView):
    @swagger_auto_schema(
        request_body=create_update_resources_groups_request_body,
        responses=response_create_update_resources_groups,
        operation_summary="update reources groups",
    )

    def put(self, request, id, format=None):
        """
        Update resource groups.
        """
        result = resource_service.update_resource_groups(request, id, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=resources_groups_details_response,
        operation_summary="get resources groups details by id",
    )
    
    def get(self, request, id, format=None):
        """
        get resource groups. detail by id
        """
        result = resource_service.get_resource_group_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=resources_details_response,
        operation_summary="delete resource groups",
    )
    
    def delete(self, request, id, format=None):
        """
        delete resource groups. detail by id
        """
        result = resource_service.delete_resource_group(request, id, format=None)
        return Response(result, status=result["code"])
        

class SearchResourceView(APIView):
    @swagger_auto_schema(
        request_body=search_request_body,
        responses=response_create_update_resources,
        operation_summary="search resource",
    )
    def post(self, request, format=None):
        """
        search resource
        """
        result = resource_service.search_resource(request, format=None)
        return Response(result, status=result["code"])
    
class SearchResourceGroupView(APIView):
    @swagger_auto_schema(
        request_body=search_request_body,
        responses=response_create_update_resources_groups,
        operation_summary="search resource groups",
    )
    def post(self, request, format=None):
        """
        search resource groups
        """
        result = resource_service.search_resource_group(request, format=None)
        return Response(result, status=result["code"])