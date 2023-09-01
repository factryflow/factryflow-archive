from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from api.utils.schemas import *

from api.services.operationalException import OperationalExceptionService

exception_service = OperationalExceptionService()

class GetOperationalExceptionTypeListView(APIView):
    @swagger_auto_schema(
        responses=operational_exception_type_details_response,
        operation_summary="get operational exception type list ",
    )
    def get(self, request, format=None):
        """
        List all operational exception type.
        """
        result = exception_service.get_all_exception_types(request, format=None)
        return Response(result, status=result["code"])


class CreateOperationalExceptionTypeView(APIView):
    @swagger_auto_schema(
        request_body=create_update_operational_exception_type,
        responses=response_create_update_operational_exception_type,
        operation_summary="Create operational exception type",
    )
    def post(self, request, format=None):
        """
        Create operational exception type.
        """
        result = exception_service.create_exception_types(request, format=None)
        return Response(result, status=result["code"])
    

class UpdateOperationalExceptionTypeView(APIView):
    @swagger_auto_schema(
        request_body=create_update_operational_exception_type,
        responses=response_create_update_operational_exception_type,
        operation_summary="Update operational exception type",
    )
    def put(self, request, id, format=None):
        """
        Update operational exception type
        """
        result = exception_service.update_exception_types(request, id, format=None)
        return Response(result, status=result["code"])

class GetOperationalExceptionTypeDetailsView(APIView):
    @swagger_auto_schema(
        responses=operational_exception_type_details_response,
        operation_summary="get operational exception type details by id ",
    )
    def get(self, request, id, format=None):
        """
        get operational exception type detail by id
        """
        result = exception_service.get_exception_type_by_id(request, id, format=None)
        return Response(result, status=result["code"])

class DeleteOperationalExceptionTypeByIdView(APIView):
    @swagger_auto_schema(
        responses=delete_operational_exception_type_response,
        operation_summary="delete operational exception type",
    )
    
    def delete(self, request, id, format=None):
        """
        delete operational exception type detail by id
        """
        result = exception_service.delete_exception_types(request, id, format=None)
        return Response(result, status=result["code"])
        

class GetOperationalExceptionListView(APIView):
    @swagger_auto_schema(
        responses=operational_exception_details_response,
        operation_summary="get operational exception list ",
    )
    def get(self, request, format=None):
        """
        List all operational exception.
        """
        result = exception_service.get_all_exception(request, format=None)
        return Response(result, status=result["code"])


class CreateOperationalExceptionView(APIView):
    @swagger_auto_schema(
        request_body=create_update_dependency_request_body,
        responses=response_create_update_operational_exception,
        operation_summary="Create operational exception ",
    )

    def post(self, request, format=None):
        """
        Create operational exception.
        """
        result = exception_service.create_exception(request, format=None)
        return Response(result, status=result["code"])
    
class UpdateOperationalExceptionView(APIView):
    @swagger_auto_schema(
        request_body=create_update_dependency_request_body,
        responses=response_create_update_operational_exception,
        operation_summary="update operational exception ",
    )
    def put(self, request, id, format=None):
        """
        Update operational exception
        """

        result = exception_service.update_exception(request, id, format=None)
        return Response(result, status=result["code"])

class GetOperationalExceptionDetailsView(APIView):
    @swagger_auto_schema(
        responses=operational_exception_details_response,
        operation_summary="get operational exception details by id ",
    )
    
    def get(self, request, id, format=None):
        """
        get operational exception detail by id
        """
        result = exception_service.get_exception_by_id(request, id, format=None)
        return Response(result, status=result["code"])

class DeleteOperationalExceptionByIdView(APIView):
    @swagger_auto_schema(
        responses=response_delete_operational_exception,
        operation_summary="delete operational exception ",
    )
    
    def delete(self, request, id, format=None):
        """
        delete operational exception detail by id
        """
        result = exception_service.delete_exception(request, id, format=None)
        return Response(result, status=result["code"])