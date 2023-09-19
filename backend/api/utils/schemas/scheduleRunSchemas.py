from drf_yasg import openapi
from api.serializers.scheduleRun import *
from api.utils.messages.scheduleRunMessages import SCHEDULE_RUN_DELETED



#This is using for getting jobs details
schedule_run_details_response = {200: GetScheduleRunDetailsSerializer()}


#This is using for create/update jobs details


create_update_schedule_run_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'triggered_by': openapi.Schema(type=openapi.TYPE_STRING, description="triggered_by"),
                'triggered_on': openapi.Schema(type=openapi.TYPE_STRING, description="triggered_on"),
                'schedule_status': openapi.Schema(type=openapi.TYPE_STRING, description="schedule_status"),
                # Add more properties as needed
            },
            required=['triggered_by', 'triggered_on', 'schedule_status'],  # Specify required fields
)

response_create_update_schedule_run = {200: GetScheduleRunDetailsSerializer()}


response_delete_schedule_run = {200: SCHEDULE_RUN_DELETED}

schedule_run_status_details_response = {200: CreateUpdateScheduleRunStatusSerializer()}                                 