from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.utils.schemas import *
from drf_yasg.utils import swagger_auto_schema
from api.services.weeklyShiftTemplate import WeeklyShiftTemplateService

template_service = WeeklyShiftTemplateService()



class GetCreateWeeklyShiftTemplateView(APIView):

    @swagger_auto_schema(
        request_body=create_update_weekly_shift_template_request_body,
        responses=response_create_update_weekly_shift_template,
        operation_summary="Create weekly shift template.",
    )
    def post(self, request, format=None):
        """
        Create weekly shift template.
        """
        result = template_service.create_weekly_shift_template(request, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=weekly_shift_template_response,
        operation_summary="List all weekly shift template",
    )
    def get(self, request, format=None):
        """
        List all weekly shift template.
        """
        result = template_service.get_all_weekly_shift_template(request, format=None)
        return Response(result, status=result["code"])


class GetUpdateDeleteWeeklyShiftTemplateView(APIView):
    
    @swagger_auto_schema(
        request_body=create_update_weekly_shift_template_request_body,
        responses=response_create_update_weekly_shift_template,
        operation_summary="update weekly shift template.",
    )
    def put(self, request, id, format=None):
        """
        update weekly shift template.
        """
        result = template_service.update_weekly_shift_template(request, id, format=None)
        return Response(result, status=result["code"])

    @swagger_auto_schema(
        responses=response_create_update_weekly_shift_template,
        operation_summary="get weekly shift template by id",
    )
    def get(self, request, id, format=None):
        """
        get weekly shift template by id
        """
        result = template_service.get_weekly_shift_template_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=response_delete_weekly_shift_template,
        operation_summary="delete weekly shift template by id",
    )
    def delete(self, request, id, format=None):
        """
        delete weekly shift template by id
        """
        result = template_service.delete_weekly_shift_template(request, id, format=None)
        return Response(result, status=result["code"])


class GetCreateWeeklyShiftDetailsView(APIView):

    @swagger_auto_schema(
        request_body=create_update_weekly_shift_template_request_body,
        responses=response_create_update_weekly_shift_template,
        operation_summary="Create weekly shift template details",
    )
    def post(self, request, format=None):
        """
        Create weekly shift details.
        """
        result = template_service.create_template_details(request, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=template_details_response,
        operation_summary="List all weekly shift details",
    )
    def get(self, request, format=None):
        """
        List all weekly shift details.
        """
        result = template_service.get_all_template_details(request, format=None)
        return Response(result, status=result["code"])
    
	


class GetUpdateDeleteWeeklyShiftDetailsView(APIView):
    
    @swagger_auto_schema(
        request_body=create_update_template_details_request_body,
        responses=response_create_update_template_details,
        operation_summary="update weekly shift template.",
    )
    def put(self, request, id, format=None):
        """
        update weekly shift template.
        """
        result = template_service.update_weekly_shift_template(request, id, format=None)
        return Response(result, status=result["code"])

    @swagger_auto_schema(
        responses=response_create_update_weekly_shift_template,
        operation_summary="get weekly shift template by id",
    )
    def get(self, request, id, format=None):
        """
        get weekly shift template by id
        """
        result = template_service.get_weekly_shift_template_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    @swagger_auto_schema(
        responses=response_delete_weekly_shift_template,
        operation_summary="delete weekly shift template by id",
    )
    def delete(self, request, id, format=None):
        """
        delete weekly shift template by id
        """
        result = template_service.delete_weekly_shift_template(request, id, format=None)
        return Response(result, status=result["code"])
    

