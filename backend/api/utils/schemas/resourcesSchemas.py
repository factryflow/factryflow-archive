from drf_yasg import openapi
from api.serializers.resources import *
from api.utils.messages.resourceMessages import RESOURCE_GROUPS_DELETED,RESOURCES_DELETED

#This is using for resources groups details
resources_groups_details_response = {200: GetResourceGroupsDetailsSerializer()}


#This is using for create/update resources groups
create_update_resources_groups_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                'resources_list': openapi.Schema(type=openapi.TYPE_STRING, description="resources_list"),
                # Add more properties as needed
            },
            required=['name', 'resources_list'],  # Specify required fields
)

response_create_update_resources_groups = {200: GetResourceGroupsDetailsSerializer()}

#This is using for delete dependency types
delete_resources_groups_details_response = {200: RESOURCE_GROUPS_DELETED}


#This is using for getting dependency details
resources_details_response = {200: GetResourcesDetailsSerializer()}


#This is using for create/update resources details

create_update_resources_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                'resource_groups_list': openapi.Schema(type=openapi.TYPE_STRING, description="resource_groups_list"),\
                # Add more properties as needed
            },
            required=['name', 'resource_groups_list'],  # Specify required fields
)

response_create_update_resources = {200: GetResourcesDetailsSerializer()}

response_delete_resources = {200: RESOURCES_DELETED}
