from drf_yasg import openapi
from api.serializers.operationalException import *
from api.utils.messages.operationalExceptionMessages import OPERATIONAL_EXCEPTION_TYPE_DELETED,OPERATIONAL_EXCEPTION_DELETED

#This is using for operational exception type  types details
operational_exception_type_details_response = {200: GetOperationalExceptionTypeDetailsSerializer()}


#This is using for create/update operational exception type
create_update_operational_exception_type = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                # Add more properties as needed
            },
            required=['name'],  # Specify required fields
)

response_create_update_operational_exception_type = {200: GetOperationalExceptionTypeDetailsSerializer()}

#This is using for delete dependency types
delete_operational_exception_type_response = {200: OPERATIONAL_EXCEPTION_TYPE_DELETED}


#This is using for getting dependency details
operational_exception_details_response = {200: GetOperationalExceptionSerializer()}


#This is using for create/update depenency details

create_update_operational_exception_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'external_id':openapi.Schema(type=openapi.TYPE_STRING, description="external_id"),
                'exception_type': openapi.Schema(type=openapi.TYPE_STRING, description="exception_type"),
                'start_datetime': openapi.Schema(type=openapi.TYPE_STRING, description="start_datetime"),
                'end_datetime': openapi.Schema(type=openapi.TYPE_STRING, description="end_datetime"),
                'notes': openapi.Schema(type=openapi.TYPE_STRING, description="notes"),
                'weekly_shift_template': openapi.Schema(type=openapi.TYPE_STRING, description="weekly_shift_template"),
               
                # Add more properties as needed
            },
            required=['external_id', 'exception_type', 'start_datetime','end_datetime','notes', 'weekly_shift_template'],  # Specify required fields
)

response_create_update_operational_exception = {200: GetOperationalExceptionSerializer()}

response_delete_operational_exception = {200: OPERATIONAL_EXCEPTION_DELETED}
