from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.services.operationalException import OperationalExceptionService

exception_service = OperationalExceptionService()

class OperationalExceptionTypeListView(APIView):
    def get(self, request, format=None):
        """
        List all operational exception type.
        """
        result = exception_service.get_all_exception_types(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateOperationalExceptionTypeView(APIView):
    def post(self, request, format=None):
        """
        Create operational exception type.
        """
        result = exception_service.create_exception_types(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update operational exception type
        """
        result = exception_service.update_exception_types(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get operational exception type detail by id
        """
        result = exception_service.get_exception_type_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete operational exception type detail by id
        """
        result = exception_service.delete_exception_types(request, id, format=None)
        return Response(result, status=result["code"])
        

class OperationalExceptionTypeListView(APIView):
    def get(self, request, format=None):
        """
        List all operational exception type.
        """
        result = exception_service.get_all_exception_types(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateOperationalExceptionTypeView(APIView):
    def post(self, request, format=None):
        """
        Create operational exception type.
        """
        result = exception_service.create_exception_types(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update operational exception type
        """
        result = exception_service.update_exception_types(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get operational exception type detail by id
        """
        result = exception_service.get_exception_type_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete operational exception type detail by id
        """
        result = exception_service.delete_exception_types(request, id, format=None)
        return Response(result, status=result["code"])
    
    
class OperationalExceptionListView(APIView):
    def get(self, request, format=None):
        """
        List all operational exception.
        """
        result = exception_service.get_all_exception(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateOperationalExceptionView(APIView):
    def post(self, request, format=None):
        """
        Create operational exception.
        """
        result = exception_service.create_exception(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update operational exception
        """
        result = exception_service.update_exception(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get operational exception detail by id
        """
        result = exception_service.get_exception_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete operational exception detail by id
        """
        result = exception_service.delete_exception(request, id, format=None)
        return Response(result, status=result["code"])