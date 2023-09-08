from api.models import ScheduleRun
from api.serializers.scheduleRun import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.scheduleRunMessages import *
from .scheduleRunBaseService import SchduleRunBaseService


class SchduleRunService(SchduleRunBaseService):
    """
    Create, Retrieve, Update or Delete a SchduleRun instance and Return all ScheduleRun.
    """

    def __init__(self):
        pass

    def get_all_schedule_run(self, request, format=None):
        """
        Retun all the SCHEDULE_RUN
        """
        schedule_obj = ScheduleRun.objects.all()
        serializer = GetScheduleRunDetailsSerializer(schedule_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_schedule_run(self, request, format=None):
        """
        Create New SCHEDULE_RUN
        """
        serializer = CreateUpdateScheduleRunerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            schedule_obj = ScheduleRun.objects.get(id=serializer.data["id"])
            serializer = GetScheduleRunDetailsSerializer(schedule_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": SCHEDULE_RUN_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_schedule_run(self, request, id, format=None):
        """
        Update SCHEDULE_RUN details
        """
        try:
            schedule_obj = ScheduleRun.objects.get(id=id)
            serializer = CreateUpdateScheduleRunerializer(schedule_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetScheduleRunDetailsSerializer(schedule_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": SCHEDULE_RUN_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except ScheduleRun.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_schedule_run_details_by_id(self, request, id, format=None):
        """
        Get SCHEDULE_RUN details by id
        """
        try:
            schedule_obj = ScheduleRun.objects.get(id=id)
            serializer = GetScheduleRunDetailsSerializer(schedule_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except ScheduleRun.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_schedule_run(self, request, id, format=None):
        """
        delete SCHEDULE_RUN details
        """
        try:
            schedule_obj = ScheduleRun.objects.get(id=id)
            schedule_obj.is_deleted = True
            schedule_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":SCHEDULE_RUN_DELETED})
        except ScheduleRun.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})