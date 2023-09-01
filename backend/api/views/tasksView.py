from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.utils.schemas import *
from drf_yasg.utils import swagger_auto_schema
from api.services.tasks import TaskService

task_service = TaskService()

class TaskListView(APIView):
    @swagger_auto_schema(
        responses=tasks_details_response,
        operation_summary="get task list ",
    )
    def get(self, request, format=None):
        """
        List all tasks.
        """
        result = task_service.get_all_tasks(request, format=None)
        return Response(result, status=result["code"])

class CreateTasksView(APIView):
    @swagger_auto_schema(
        request_body=create_update_tasks_request_body,
        responses=response_create_update_tasks,
        operation_summary="Create tasks",
    )
    def post(self, request, format=None):
        """
        Create tasks.
        """
        result = task_service.create_tasks(request, format=None)
        return Response(result, status=result["code"])
    
class UpdateTasksView(APIView):
    @swagger_auto_schema(
        request_body=create_update_tasks_request_body,
        responses=response_create_update_tasks,
        operation_summary="update tasks",
    )
    def put(self, request, id, format=None):
        """
        Update tasks
        """
        result = task_service.update_tasks(request, id, format=None)
        return Response(result, status=result["code"])
    
class GetTasksDetailsView(APIView):
    @swagger_auto_schema(
        responses=tasks_details_response,
        operation_summary="get tasks by id ",
    )
    def get(self, request, id, format=None):
        """
        get task detail by id
        """
        result = task_service.get_task_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
class DeleteTasksView(APIView):
    @swagger_auto_schema(
    responses=response_delete_tasks,
    operation_summary="delete tasks ",
    )
    def delete(self, request, id, format=None):
        """
        delete task details by id
        """
        result = task_service.delete_tasks(request, id, format=None)
        return Response(result, status=result["code"])
        

