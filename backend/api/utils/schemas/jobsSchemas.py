from drf_yasg import openapi
from api.serializers.job import *
from api.utils.messages.jobMessages import JOB_DELETED



#This is using for getting jobs details
jobs_details_response = {200: GetJobsDetailsSerializer()}


#This is using for create/update jobs details


create_update_jobs_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                'priority': openapi.Schema(type=openapi.TYPE_STRING, description="priority"),
                'due_date': openapi.Schema(type=openapi.TYPE_STRING, description="due_date"),
                'customer': openapi.Schema(type=openapi.TYPE_STRING, description="customer"),
                'description': openapi.Schema(type=openapi.TYPE_STRING, description="description"),
                'note': openapi.Schema(type=openapi.TYPE_STRING, description="note"),
                'planned_start': openapi.Schema(type=openapi.TYPE_STRING, description="planned_start"),
                'planned_end': openapi.Schema(type=openapi.TYPE_STRING, description="planned_end"),
                # Add more properties as needed
            },
            required=['name', 'priority','due_date','customer','description','note','planned_start','planned_end'],  # Specify required fields
)

response_create_update_job = {200: GetJobsDetailsSerializer()}


response_delete_job = {200: JOB_DELETED}

