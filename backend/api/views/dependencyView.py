from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.utils.schemas import *
from drf_yasg.utils import swagger_auto_schema
from api.services.dependency import DependencyService

dependency_service = DependencyService()

class DependencyTypesListView(APIView):
    @swagger_auto_schema(
        responses=dependency_type_details_response,
        operation_summary="List all dependency types.",
    )
    def get(self, request, format=None):
        """
        List all dependency types.
        """
        result = dependency_service.get_all_dependency_types(request, format=None)
        return Response(result, status=result["code"])

class CreateDependencyTypesView(APIView):
    @swagger_auto_schema(
        request_body=create_update_dependency_type_request_body,
        responses=response_create_update_dependency_type,
        operation_summary="Create dependency types",
    )
    def post(self, request, format=None):
        """
        Create dependency types.
        """
        result = dependency_service.create_dependency_types(request, format=None)
        return Response(result, status=result["code"])
    
class UpdateDependencyTypesView(APIView):
    @swagger_auto_schema(
        request_body=create_update_dependency_type_request_body,
        responses=response_create_update_dependency_type,
        operation_summary="Update dependency types",
    )
    def put(self, request, id, format=None):
        """
        Update dependency types
        """
        result = dependency_service.update_dependency_types(request, id, format=None)
        return Response(result, status=result["code"])
    
    
class DeleteDependencyTypesView(APIView):
    @swagger_auto_schema(
        responses=delete_dependency_type_details_response,
        operation_summary="delete dependency types detail by id",
    )
    def delete(self, request, id, format=None):
        """
        delete dependency types detail by id
        """
        result = dependency_service.delete_dependency_types(request, id, format=None)
        return Response(result, status=result["code"])
        

class CreateDependencyView(APIView):
    @swagger_auto_schema(
        request_body=create_update_dependency_request_body,
        responses=response_create_update_dependency,
        operation_summary="Create dependency",
    )
    def post(self, request, format=None):
        """
        Create dependency.
        """
        result = dependency_service.create_dependency(request, format=None)
        return Response(result, status=result["code"])
    
    
class UpdateDependencyView(APIView):
    @swagger_auto_schema(
        request_body=create_update_dependency_request_body,
        responses=response_create_update_dependency,
        operation_summary="Update dependency",
    )
    def put(self, request, id, format=None):
        """
        Update dependency
        """
        result = dependency_service.update_dependency(request, id, format=None)
        return Response(result, status=result["code"])
    

class GetDependencyByIdView(APIView):
    @swagger_auto_schema(
        responses=dependency_details_response,
        operation_summary="Get dependency by id",
    )
    def get(self, request, id, format=None):
        """
        get dependency details by id
        """
        result = dependency_service.get_dependency_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    
class DependencListView(APIView):
    @swagger_auto_schema(
        responses=dependency_details_response,
        operation_summary="List all dependency.",
    )
    def get(self, request, format=None):
        """
        List all dependency.
        """
        result = dependency_service.get_all_dependency(request, format=None)
        return Response(result, status=result["code"])
    
    
class DeleteDependencyByIdView(APIView):
    @swagger_auto_schema(
        responses=response_delete_dependency,
        operation_summary="delete dependency",
    )
    def delete(self, request, id, format=None):
        """
        delete dependency detail by id
        """
        result = dependency_service.delete_dependency(request, id, format=None)
        return Response(result, status=result["code"])
        

class GetDependencyStatusDetails(APIView):
    @swagger_auto_schema(
        responses=dependency_status_response,
        operation_summary="get all dependency status",
    )
    def delete(self, request, id, format=None):
        """
        get all dependency status
        """
        result = dependency_service.get_all_dependency_status(request, id, format=None)
        return Response(result, status=result["code"])