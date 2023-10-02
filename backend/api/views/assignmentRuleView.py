from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.utils.schemas import *
from drf_yasg.utils import swagger_auto_schema
from api.services.assignmentRule import AssignmentRuleService

assignment_rule_service = AssignmentRuleService()




class GetCreateAssignmentRuleView(APIView):

    @swagger_auto_schema(
        request_body=create_update_assignment_rule_request_body,
        responses=response_create_update_assignment_rule,
        operation_summary="Create assignment rule",
    )
    def post(self, request, format=None):
        """
        Create assignment rule.
        """
        result = assignment_rule_service.create_assignment_rule(request, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=assignment_rule_details_response,
        operation_summary="List all assignment rule.",
    )
    def get(self, request, format=None):
        """
        List all assignment rule.
        """
        result = assignment_rule_service.get_all_assignment_rule(request, format=None)
        return Response(result, status=result["code"])
    
	


class GetUpdateAssignmentRuleView(APIView):
    
    @swagger_auto_schema(
        request_body=create_update_assignment_rule_request_body,
        responses=response_create_update_assignment_rule,
        operation_summary="Update assignment rule",
    )
    def put(self, request, id, format=None):
        """
        Update assignment rule
        """
        result = assignment_rule_service.update_assignment_rule(request, id, format=None)
        return Response(result, status=result["code"])
    
    
    @swagger_auto_schema(
        responses=assignment_rule_details_response,
        operation_summary="get assignment rule by id.",
    )
    def get(self, request, id, format=None):
        """
        get assignment details by id
        """
        result = assignment_rule_service.get_assignment_rule_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=response_delete_assignment_rule,
        operation_summary="delete assignment rule detail by id",
    )
    def delete(self, request, id, format=None):
        """
        delete assignment rule detail by id
        """
        result = assignment_rule_service.delete_assignment_rule(request, id, format=None)
        return Response(result, status=result["code"])
    



class GetCreateTaskResourceAssignmentView(APIView):

    @swagger_auto_schema(
        request_body=create_update_task_resource_assignment_request_body,
        responses=response_create_update_task_resource_assignment,
        operation_summary="Create task resource assignment",
    )
    def post(self, request, format=None):
        """
        Create task resource assignment.
        """
        result = assignment_rule_service.create_task_resource_assignment(request, format=None)
        return Response(result, status=result["code"])
    
    
    @swagger_auto_schema(
        responses=task_resource_assignment_details_response,
        operation_summary="List all task resource assignment",
    )
    def get(self, request, format=None):
        """
        List all task resource assignment.
        """
        result = assignment_rule_service.get_all_task_resource_assignment(request, format=None)
        return Response(result, status=result["code"])

    
	


class GetUpdateResourceAssignmentView(APIView):
    
    @swagger_auto_schema(
        request_body=create_update_task_resource_assignment_request_body,
        responses=response_create_update_task_resource_assignment,
        operation_summary="Update task resource assignment",
    )
    def put(self, request, id, format=None):
        """
        Update task resource assignment
        """
        result = assignment_rule_service.update_task_resource_assignment(request, id, format=None)
        return Response(result, status=result["code"])
    
    
    @swagger_auto_schema(
        responses=task_resource_assignment_details_response,
        operation_summary="get task resource assignment by id.",
    )
    def get(self, request, format=None):
        """
        get task resource assignment details by id
        """
        result = assignment_rule_service.get_task_resource_assignment_by_id(request, format=None)
        return Response(result, status=result["code"])
    
    
    @swagger_auto_schema(
        responses=response_delete_task_resource_assignment,
        operation_summary="delete task resource assignment detail by id",
    )
    def delete(self, request, id, format=None):
        """
        delete task resource assignment detail by id
        """
        result = assignment_rule_service.delete_task_resource_assignment(request, id, format=None)
        return Response(result, status=result["code"])






class GetCreateAssignmentRuleCriteriaView(APIView):

    @swagger_auto_schema(
        request_body=create_update_assignment_rule_criteria_request_body,
        responses=response_create_update_assignment_rule_criteria,
        operation_summary="Create assignment rule criteria",
    )
    def post(self, request, format=None):
        """
        Create assignment rule criteria.
        """
        result = assignment_rule_service.create_assignment_rule_criteria(request, format=None)
        return Response(result, status=result["code"])
    
    
    @swagger_auto_schema(
        responses=assignment_rule_criteria_details_response,
        operation_summary="List all assignment rule criteria",
    )
    def get(self, request, format=None):
        """
        List all assignment rule criteria
        """
        result = assignment_rule_service.get_all_assignment_rule_criteria(request, format=None)
        return Response(result, status=result["code"])

    
	


class GetUpdateAssignmentRuleCriteriaView(APIView):
    
    @swagger_auto_schema(
        request_body=create_update_assignment_rule_criteria_request_body,
        responses=response_create_update_assignment_rule_criteria,
        operation_summary="Update assignment rule criteria",
    )
    def put(self, request, id, format=None):
        """
        Update assignment rule criteria
        """
        result = assignment_rule_service.update_assignment_rule_criteria(request, id, format=None)
        return Response(result, status=result["code"])
    
    
    @swagger_auto_schema(
        responses=assignment_rule_criteria_details_response,
        operation_summary="get assignment rule criteria by id",
    )
    def get(self, request,id, format=None):
        """
        get assignment rule criteria details by id
        """
        result = assignment_rule_service.get_assignment_rule_criteria_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    
    @swagger_auto_schema(
        responses=response_delete_assignment_rule_criteria,
        operation_summary="delete assignment rule criteria detail by id",
    )
    def delete(self, request, id, format=None):
        """
        delete assignment rule criteria detail by id
        """
        result = assignment_rule_service.delete_assignment_rule_criteria(request, id, format=None)
        return Response(result, status=result["code"])









