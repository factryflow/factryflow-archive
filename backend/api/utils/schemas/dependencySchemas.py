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
                'dependency_type': openapi.Schema(type=openapi.TYPE_STRING, description="dependency_type"),\
                'dependency_status': openapi.Schema(type=openapi.TYPE_STRING, description="dependency_status"),
                'expected_closed': openapi.Schema(type=openapi.TYPE_STRING, description="expected_closed"),
                'closed_date': openapi.Schema(type=openapi.TYPE_STRING, description="closed_date"),
                'notes': openapi.Schema(type=openapi.TYPE_STRING, description="notes"),
                'jobs': openapi.Schema(type=openapi.TYPE_STRING, description="jobs"),
                'tasks': openapi.Schema(type=openapi.TYPE_STRING, description="tasks"),
                # Add more properties as needed
            },
            required=['name', 'dependency_type','dependency_status','expected_closed','closed_date','notes','jobs','tasks'],  # Specify required fields
)

response_create_update_dependency = {200: GetDependencyDetailsSerializer()}

response_delete_dependency = {200: DEPENDENCY_TYPES_DELETED}
