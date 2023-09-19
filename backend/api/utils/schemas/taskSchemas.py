from drf_yasg import openapi
from api.serializers.tasks import *
from api.utils.messages.taskMessages import TASK_DELETED



#This is using for getting tasks details
tasks_details_response = {200: GetTaskDetailsSerializer()}


#This is using for create/update tasks details
create_update_tasks_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'external_id': openapi.Schema(type=openapi.TYPE_STRING, description="external_id"),
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                'task_status': openapi.Schema(type=openapi.TYPE_STRING, description="task_status"),
                'task_type': openapi.Schema(type=openapi.TYPE_STRING, description="task_type"),
                'setup_time': openapi.Schema(type=openapi.TYPE_STRING, description="setup_time"),
                'run_time_per_unit': openapi.Schema(type=openapi.TYPE_STRING, description="run_time_per_unit"),
                'teardown_time': openapi.Schema(type=openapi.TYPE_STRING, description="teardown_time"),
                'quantity': openapi.Schema(type=openapi.TYPE_STRING, description="quantity"),
                'jobs': openapi.Schema(type=openapi.TYPE_STRING, description="jobs"),
                'predecessors': openapi.Schema(type=openapi.TYPE_STRING, description="predecessors"),
                'item': openapi.Schema(type=openapi.TYPE_STRING, description="item"),
                'planned_start_datetime': openapi.Schema(type=openapi.TYPE_STRING, description="planned_start_datetime"),
                'planned_end_datetime': openapi.Schema(type=openapi.TYPE_STRING, description="planned_end_datetime"),
                # Add more properties as needed
            },
            required=['external_id', 'name','task_status', 'task_type', 'setup_time','run_time_per_unit','teardown_time','quantity','jobs', 'predecessors', 'item', 'planned_start_datetime', 'planned_end_datetime'],  # Specify required fields
)

response_create_update_tasks = {200: GetTaskDetailsSerializer()}

response_delete_tasks = {200: TASK_DELETED}