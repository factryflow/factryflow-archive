from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.services.tasks import TaskService

task_service = TaskService()

class TaskListView(APIView):
    def get(self, request, format=None):
        """
        List all tasks.
        """
        result = task_service.get_all_tasks(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateTasksView(APIView):
    def post(self, request, format=None):
        """
        Create tasks.
        """
        result = task_service.create_tasks(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update tasks
        """
        result = task_service.update_tasks(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get task detail by id
        """
        result = task_service.get_task_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete task detail by id
        """
        result = task_service.delete_tasks(request, id, format=None)
        return Response(result, status=result["code"])
        

