from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.services.role import RoleService

roleService = RoleService()

class RoleListView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        """
        List all roles.
        """
        result = roleService.get_all_roles(request, format=None)
        return Response(result, status=result["code"])


class RoleCreateView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        """
        Create Role.
        """
        result = roleService.create(request, format=None)
        return Response(result, status=result["code"])


