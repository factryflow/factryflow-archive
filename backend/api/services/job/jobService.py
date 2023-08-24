from api.models import Jobs
from api.serializers.job import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.jobMessages import *
from .jobBaseService import JobBaseService


class JobService(JobBaseService):
    """
    Create, Retrieve, Update or Delete a jobs instance and Return all jobs.
    """

    def __init__(self):
        pass

    def get_all_jobs(self, request, format=None):
        """
        Retun all the jobs
        """
        job_obj = Jobs.objects.all()
        serializer = GetJobsDetailsSerializer(job_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_jobs(self, request, format=None):
        """
        Create New job
        """
        serializer = CreateUpdateJobSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            job_obj = Jobs.objects.get(id=serializer.data["id"])
            serializer = GetJobsDetailsSerializer(job_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": JOB_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_job(self, request, id, format=None):
        """
        Update jobs details
        """
        try:
            job_obj = Jobs.objects.get(id=id)
            serializer = CreateUpdateJobSerializer(job_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetJobsDetailsSerializer(job_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": JOB_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except Jobs.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_job_details_by_id(self, request, id, format=None):
        """
        Get Job details by id
        """
        try:
            job_obj = Jobs.objects.get(id=id)
            serializer = GetJobsDetailsSerializer(job_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except Jobs.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_job(self, request, id, format=None):
        """
        delete Job details
        """
        try:
            job_obj = Jobs.objects.get(id=id)
            job_obj.is_deleted = True
            job_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":JOB_DELETED})
        except Jobs.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})