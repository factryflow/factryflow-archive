from api.models import OperationalExceptionType
from api.serializers.operationalException import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.operationalExceptionMessages import *
from .operationalExceptionBaseService import OperationalExceptionBaseService


class OperationalExceptionService(OperationalExceptionBaseService):
    """
    Create, Retrieve, Update or Delete a OperationalExceptionType instance and Return all OperationalExceptionType.
    """

    def __init__(self):
        pass

    def get_all_exception_types(self, request, format=None):
        """
        Retun all the operational exception types
        """
        exception_type_obj = OperationalExceptionType.objects.all()
        serializer = GetOperationalExceptionTypeDetailsSerializer(exception_type_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_exception_types(self, request, format=None):
        """
        Create New operational exception type
        """
        serializer = CreateUpdateOperationalExceptionTypeSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            exception_type_obj = OperationalExceptionType.objects.get(id=serializer.data["id"])
            serializer = GetOperationalExceptionTypeDetailsSerializer(exception_type_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": OPERATIONAL_EXCEPTION_TYPE_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_exception_types(self, request, id, format=None):
        """
        Update operational exception types details
        """
        try:
            exception_type_obj = OperationalExceptionType.objects.get(id=id)
            serializer = CreateUpdateOperationalExceptionTypeSerializer(exception_type_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetOperationalExceptionTypeDetailsSerializer(exception_type_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": OPERATIONAL_EXCEPTION_TYPE_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except OperationalExceptionType.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_exception_type_by_id(self, request, id, format=None):
        """
        Get operational exception type details by id
        """
        try:
            exception_type_obj = OperationalExceptionType.objects.get(id=id)
            serializer = GetOperationalExceptionTypeDetailsSerializer(exception_type_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except OperationalExceptionType.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_exception_types(self, request, id, format=None):
        """
        delete operational exception type details
        """
        try:
            exception_type_obj = OperationalExceptionType.objects.get(id=id)
            exception_type_obj.is_deleted = True
            exception_type_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":OPERATIONAL_EXCEPTION_TYPE_DELETED})
        except OperationalExceptionType.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    #operational Exception   
    def get_all_exception(self, request, format=None):
        """
        Retun all the operational exception
        """
        exception_obj = OperationalException.objects.all()
        serializer = GetOperationalExceptionSerializer(exception_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_exception(self, request, format=None):
        """
        Create New operational exception
        """
        serializer = CreateUpdateOperationalExceptionSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            exception_obj = OperationalException.objects.get(id=serializer.data["id"])
            serializer = GetOperationalExceptionSerializer(exception_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": OPERATIONAL_EXCEPTION_TYPE_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_exception(self, request, id, format=None):
        """
        Update operational exception details
        """
        try:
            exception_obj = OperationalException.objects.get(id=id)
            serializer = CreateUpdateOperationalExceptionSerializer(exception_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetOperationalExceptionSerializer(exception_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": OPERATIONAL_EXCEPTION_TYPE_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except OperationalException.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_exception_by_id(self, request, id, format=None):
        """
        Get operational exception details by id
        """
        try:
            exception_obj = OperationalException.objects.get(id=id)
            serializer = GetOperationalExceptionSerializer(exception_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except OperationalException.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_exception(self, request, id, format=None):
        """
        delete operational exception details
        """
        try:
            exception_obj = OperationalException.objects.get(id=id)
            exception_obj.is_deleted = True
            exception_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":OPERATIONAL_EXCEPTION_TYPE_DELETED})
        except OperationalException.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})