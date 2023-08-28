from api.models import Role
from api.serializers.role import RoleSerializer, RoleDetailSerializer
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.roleMessages import *
from .roleBaseService import RoleBaseService


class RoleService(RoleBaseService):
    """
    Create, Retrieve, Update or Delete a zone instance and Return all roles.
    """

    def __init__(self):
        pass

    def get_all_roles(self, request, format=None):
        """
        Retun all the role Excluding Role id 4.
        """
        roles = Role.objects.exclude(id__in=[1])
        serializer = RoleDetailSerializer (roles, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create(self, request, format=None):
        """
        Create New role And check if same name role is existing in the database then return the error
        """
        role = self.get_object_by_name (request.data.get ('name'))
        if role:
            error = {"name": ROLE_NAME_ALREADY_EXIST}
            return ({"data": error, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

        else:
            serializer = RoleSerializer (data=request.data)
            if serializer.is_valid ():
                serializer.save ()
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": ROLE_CREATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def get_object_by_name(self, name):
        """
        Get Object by Name and full_name.
        """
        try:
            return Role.objects.get (name=name)
        except Role.DoesNotExist:
            None

