from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.services.job import JobService

Job_service = JobService()

class JobListView(APIView):
    def get(self, request, format=None):
        """
        List all jobs.
        """
        result = Job_service.get_all_jobs(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateJobsView(APIView):
    def post(self, request, format=None):
        """
        Create Jobs.
        """
        result = Job_service.create_jobs(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update jobs
        """
        result = Job_service.update_job(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get job detail by id
        """
        result = Job_service.get_job_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete job detail by id
        """
        result = Job_service.delete_job(request, id, format=None)
        return Response(result, status=result["code"])
        

