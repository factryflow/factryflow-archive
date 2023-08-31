from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.utils.schemas import *
from drf_yasg.utils import swagger_auto_schema
from api.services.role import RoleService

roleService = RoleService()

class RoleListView(APIView):
    permission_classes = (AllowAny,)
    @swagger_auto_schema(
        responses=get_role_list_response,
        operation_summary="Get all roles",
    )
    def get(self, request, format=None):
        """
        List all roles.
        """
        result = roleService.get_all_roles(request, format=None)
        return Response(result, status=result["code"])


class RoleCreateView(APIView):
    permission_classes = (AllowAny,)
    @swagger_auto_schema(
        request_body=create_role_request_body,
        responses=create_role_response,
        operation_summary="Create Roles",
    )
    def post(self, request, format=None):
        """
        Create Role.
        """
        result = roleService.create(request, format=None)
        return Response(result, status=result["code"])


