from api.models import Jobs
from api.serializers.job import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.jobMessages import *
from .assignmentRuleBaseService import AssignmentRuleBaseService


class AssignmentRuleService(AssignmentRuleBaseService):
    """
    Create, Retrieve, Update or Delete a assignment rule instance and Return all assignment rule.
    """

    def __init__(self):
        pass

    def get_all_assignment_rule(self, request, format=None):
        """
        Retun all the assignment rule
        """
        job_obj = Jobs.objects.all()
        serializer = GetJobsDetailsSerializer(job_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_assignment_rule(self, request, format=None):
        """
        Create New assignment rule
        """
        serializer = CreateUpdateJobSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            job_obj = Jobs.objects.get(id=serializer.data["id"])
            serializer = GetJobsDetailsSerializer(job_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": JOB_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_assignment_rule(self, request, id, format=None):
        """
        Update assignment rule details
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
        
        
    def get_assignment_rule_by_id(self, request, id, format=None):
        """
        Get assignment rule details by id
        """
        try:
            job_obj = Jobs.objects.get(id=id)
            serializer = GetJobsDetailsSerializer(job_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except Jobs.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_assignment_rule(self, request, id, format=None):
        """
        delete assignment rule details
        """
        try:
            job_obj = Jobs.objects.get(id=id)
            job_obj.is_deleted = True
            job_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":JOB_DELETED})
        except Jobs.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})