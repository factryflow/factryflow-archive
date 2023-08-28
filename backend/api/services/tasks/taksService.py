from api.models import Tasks
from api.serializers.tasks import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.taskMessages import *
from .taskBaseService import TaskBaseService


class TaskService(TaskBaseService):
    """
    Create, Retrieve, Update or Delete a Task instance and Return all tasks.
    """

    def __init__(self):
        pass

    def get_all_tasks(self, request, format=None):
        """
        Retun all the Tasks
        """
        task_obj = Tasks.objects.all()
        serializer = GetTaskDetailsSerializer(task_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_tasks(self, request, format=None):
        """
        Create New Task
        """
        serializer = CreateUpdateTaskSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save ()
            task_obj = Tasks.objects.get(id=serializer.data["id"])
            serializer = GetTaskDetailsSerializer(task_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": TASK_CREATED})
        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_tasks(self, request, id, format=None):
        """
        Update Tasks details
        """
        try:
            task_obj = Tasks.objects.get(id=id)
            serializer = CreateUpdateTaskSerializer(task_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetTaskDetailsSerializer(task_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": TASK_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except Tasks.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_task_details_by_id(self, request, id, format=None):
        """
        Get Task details by id
        """
        try:
            task_obj = Tasks.objects.get(id=id)
            serializer = GetTaskDetailsSerializer(task_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except Tasks.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_tasks(self, request, id, format=None):
        """
        delete Task details
        """
        try:
            task_obj = Tasks.objects.get(id=id)
            task_obj.is_deleted = True
            task_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":TASK_DELETED})
        except Tasks.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})