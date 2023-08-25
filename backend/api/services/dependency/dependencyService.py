from api.models import DependencyTypes
from api.serializers.dependency import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.dependencyMessages import *
from .dependencyBaseService import DependencyBaseService


class DependencyService(DependencyBaseService):
    """
    Create, Retrieve, Update or Delete a dependency instance and Return all dependency.
    """

    def __init__(self):
        pass

    def get_all_dependency_types(self, request, format=None):
        """
        Retun all the dependency types
        """
        dependency_type_obj = DependencyTypes.objects.all()
        serializer = GetDependencyTypeDetailsSerializer(dependency_type_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_dependency_types(self, request, format=None):
        """
        Create New dependency types
        """
        serializer = CreateUpdateDependencyTypeSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save ()
            dependency_type_obj = DependencyTypes.objects.get(id=serializer.data["id"])
            serializer = GetDependencyTypeDetailsSerializer(dependency_type_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": DEPENDENCY_TYPES_CREATED})
        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_dependency_types(self, request, id, format=None):
        """
        Update dependency types details
        """
        try:
            dependency_type_obj = DependencyTypes.objects.get(id=id)
            serializer = CreateUpdateDependencyTypeSerializer(dependency_type_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetDependencyTypeDetailsSerializer(dependency_type_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": DEPENDENCY_TYPES_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except DependencyTypes.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_dependency_types(self, request, id, format=None):
        """
        delete dependency types details
        """
        try:
            dependency_type_obj = DependencyTypes.objects.get(id=id)
            dependency_type_obj.is_deleted = True
            dependency_type_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":DEPENDENCY_TYPES_DELETED})
        except DependencyTypes.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    
    def get_all_dependency(self, request, format=None):
        """
        Retun all the dependency 
        """
        dependency_type_obj = Dependency.objects.all()
        serializer = GetDependencyDetailsSerializer(dependency_type_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})
    
    def get_dependency_details_by_id(self, request, id, format=None):
        """
        Retun dependency details by id 
        """
        try:
            dependency_type_obj = Dependency.objects.get(id=id)
            serializer = GetDependencyDetailsSerializer(dependency_type_obj)
            return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})
        except Dependency.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})

    def create_dependency(self, request, format=None):
        """
        Create new dependency 
        """
        serializer = CreateUpdateDependencySerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save ()
            dependency_type_obj = Dependency.objects.get(id=serializer.data["id"])
            serializer = GetDependencyDetailsSerializer(dependency_type_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": DEPENDENCY_CREATED})
        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_dependency(self, request, id, format=None):
        """
        Update dependency  details
        """
        try:
            dependency_type_obj = Dependency.objects.get(id=id)
            serializer = CreateUpdateDependencySerializer(dependency_type_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetDependencyDetailsSerializer(dependency_type_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": DEPENDENCY_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except Dependency.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_dependency(self, request, id, format=None):
        """
        delete dependency  details
        """
        try:
            dependency_type_obj = Dependency.objects.get(id=id)
            dependency_type_obj.is_deleted = True
            dependency_type_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":DEPENDENCY_DELETED})
        except Dependency.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})