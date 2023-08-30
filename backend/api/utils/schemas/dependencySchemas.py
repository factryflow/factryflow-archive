from drf_yasg import openapi
from api.serializers.dependency import *
from api.utils.messages.dependencyMessages import DEPENDENCY_TYPES_DELETED

#This is using for dependency types details
dependency_type_details_response = {200: GetDependencyTypeDetailsSerializer()}


#This is using for create/update dependency Types
create_update_dependency_type_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                'description': openapi.Schema(type=openapi.TYPE_STRING, description="description"),
                # Add more properties as needed
            },
            required=['name', 'description'],  # Specify required fields
)

response_create_update_dependency_type = {200: GetDependencyTypeDetailsSerializer()}

#This is using for delete dependency types
delete_dependency_type_details_response = {200: DEPENDENCY_TYPES_DELETED}


#This is using for getting dependency details
dependency_details_response = {200: GetDependencyDetailsSerializer()}


#This is using for create/update depenency details
create_update_dependency_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                'description': openapi.Schema(type=openapi.TYPE_STRING, description="description"),
                # Add more properties as needed
            },
            required=['name', 'description'],  # Specify required fields
)

response_create_update_dependency = {200: GetDependencyDetailsSerializer()}
