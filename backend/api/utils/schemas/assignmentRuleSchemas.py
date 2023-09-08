from drf_yasg import openapi
from api.serializers.assignmentRule import *
from api.serializers.taskResourceAssignment import *
from api.utils.messages.assignmentRuleMessages import ASSIGNMENT_RULE_DELETED, TASK_RESOURCE_ASSIGNMENT_DELETED, ASSINGMENT_RULE_CRITERIA_DELETED



#This is using for getting assignmentRule details
assignment_rule_details_response = {200: GetAssignmentRuleDetailsSerializer()}


#This is using for create/update assignmentRule details


create_update_assignment_rule_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="name"),
                'description': openapi.Schema(type=openapi.TYPE_STRING, description="description"),
                'priority': openapi.Schema(type=openapi.TYPE_STRING, description="priority"),
                'resource_count': openapi.Schema(type=openapi.TYPE_STRING, description="resource_count"),
                'use_all_resources': openapi.Schema(type=openapi.TYPE_BOOLEAN, description="use_all_resources"),
                
                # Add more properties as needed
            },
            required=['name', 'description', 'priority', 'resource_count', 'use_all_resources'],  # Specify required fields
)

response_create_update_assignment_rule = {200: GetAssignmentRuleDetailsSerializer()}


response_delete_assignment_rule = {200: ASSIGNMENT_RULE_DELETED}



#This is using for getting task resoucrce assignment details
task_resource_assignment_details_response = {200: GetTaskResourceAssignmentDetailsSerializer()}


#This is using for create/update task resoucrce assignment details


create_update_task_resource_assignment_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'task': openapi.Schema(type=openapi.TYPE_STRING, description="task"),
                'resource': openapi.Schema(type=openapi.TYPE_STRING, description="resource"),
                # Add more properties as needed
            },
            required=['task', 'resource'],  # Specify required fields
)

response_create_update_task_resource_assignment = {200: GetTaskResourceAssignmentDetailsSerializer()}


response_delete_task_resource_assignment = {200: TASK_RESOURCE_ASSIGNMENT_DELETED}



#This is using for getting assignment rule criteria details
assignment_rule_criteria_details_response = {200: GetAssignmentRuleCriteriaDetailsSerializer()}


#This is using for create/update assignment rule criteria details


create_update_assignment_rule_criteria_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'field': openapi.Schema(type=openapi.TYPE_STRING, description="field"),
                'operator': openapi.Schema(type=openapi.TYPE_STRING, description="operator"),
                'value': openapi.Schema(type=openapi.TYPE_STRING, description="value"),
                'parent': openapi.Schema(type=openapi.TYPE_STRING, description="parent"),
                'assignment_rule': openapi.Schema(type=openapi.TYPE_STRING, description="assignment_rule"),
                # Add more properties as needed
            },
            required=['field', 'operator', 'value', 'parent', 'assignment_rule'],  # Specify required fields
)

response_create_update_assignment_rule_criteria = {200: GetAssignmentRuleCriteriaDetailsSerializer()}


response_delete_assignment_rule_criteria = {200: ASSINGMENT_RULE_CRITERIA_DELETED}