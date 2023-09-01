from drf_yasg import openapi
from api.serializers.weeklyShiftTemplate import *
from api.utils.messages.weeklyShiftTemplateMessages import WEEKLY_SHIFT_TEMPLATE_DELETED, WEEKLY_SHIFT_TEMPLATE_DETAILS_DELETED


#This is using for getting weekly shift template
weekly_shift_template_response = {200: GetWeeklyShiftTemplateDetailsSerializer()}

#This is using for create/update weekly shift template
create_update_weekly_shift_template_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                # Add more properties as needed
            },
            required=['name'],  # Specify required fields
)

response_create_update_weekly_shift_template = {200: GetWeeklyShiftTemplateDetailsSerializer()}

response_delete_weekly_shift_template = {200: WEEKLY_SHIFT_TEMPLATE_DELETED}


#Template Details
#This is using for getting weekly shift template details
template_details_response = {200: GetTemplateDetailsSerializer()}

#This is using for create/update weekly shift template
create_update_template_details_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'template': openapi.Schema(type=openapi.TYPE_STRING, description="template"),
                'day_of_week': openapi.Schema(type=openapi.TYPE_STRING, description="day_of_week"),
                'start_time': openapi.Schema(type=openapi.TYPE_STRING, description="start_time"),
                'end_time': openapi.Schema(type=openapi.TYPE_STRING, description="end_time"),
                # Add more properties as needed
            },
            required=['template', 'day_of_week', 'start_time', 'end_time'],  # Specify required fields
)

response_create_update_template_details = {200: GetTemplateDetailsSerializer()}

response_delete_template_details = {200: WEEKLY_SHIFT_TEMPLATE_DETAILS_DELETED}