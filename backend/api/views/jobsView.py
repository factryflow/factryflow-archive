from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from api.utils.schemas import *


from api.services.job import JobService

Job_service = JobService()

class JobListView(APIView):
    @swagger_auto_schema(
        responses=jobs_details_response,
        operation_summary="get jobs list ",
    )
    def get(self, request, format=None):
        """
        List all jobs.
        """
        result = Job_service.get_all_jobs(request, format=None)
        return Response(result, status=result["code"])


class CreateJobsView(APIView):
    @swagger_auto_schema(
        request_body=create_update_jobs_request_body,
        responses=response_create_update_job,
        operation_summary="Create jobs",
    )
    def post(self, request, format=None):
        """
        Create Jobs.
        """
        result = Job_service.create_jobs(request, format=None)
        return Response(result, status=result["code"])

class UpdateJobsView(APIView):
    @swagger_auto_schema(
        request_body=create_update_jobs_request_body,
        responses=response_create_update_job,
        operation_summary="upadte jobs",
    )

    def put(self, request, id, format=None):
        """
        Update jobs
        """
        result = Job_service.update_job(request, id, format=None)
        return Response(result, status=result["code"])


class GetJobByIdView(APIView):
    @swagger_auto_schema(
        responses=jobs_details_response,
        operation_summary="Get job by id",
    )
    
    def get(self, request, id, format=None):
        """
        get job detail by id
        """
        result = Job_service.get_job_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    
class DeleteJobByIdView(APIView):
    @swagger_auto_schema(
        responses=response_delete_job,
        operation_summary="delete job",
    )
    def delete(self, request, id, format=None):
        """
        delete job detail by id
        """
        result = Job_service.delete_job(request, id, format=None)
        return Response(result, status=result["code"])


class SearchJobView(APIView):
    @swagger_auto_schema(
        request_body=search_request_body,
        responses=response_create_update_job,
        operation_summary="search job",
    )
    def post(self, request, format=None):
        """
        search job
        """
        result = Job_service.search_job(request, format=None)
        return Response(result, status=result["code"])
    

class JobTypesListView(APIView):
    @swagger_auto_schema(
        responses=response_create_update_job_type,
        operation_summary="get job type list ",
    )
    def get(self, request, format=None):
        """
        get job type list
        """
        result = Job_service.get_all_job_types(request, format=None)
        return Response(result, status=result["code"])

class JobStatusListView(APIView):
    @swagger_auto_schema(
        responses=response_create_update_job_type,
        operation_summary="get job status list ",
    )
    def get(self, request, format=None):
        """
        get job status list
        """
        result = Job_service.get_all_job_status(request, format=None)
        return Response(result, status=result["code"])