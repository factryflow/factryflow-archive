from drf_yasg import openapi
from api.serializers.role import *


#This is using in create role
create_role_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                # Add more properties as needed
            },
            required=['name'],  # Specify required fields
        )
create_role_response = {200: RoleSerializer()}

#This is using for get role list
get_role_list_response = {200: RoleDetailSerializer()}