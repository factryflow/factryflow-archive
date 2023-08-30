from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.services.weeklyShiftTemplate import WeeklyShiftTemplateService

template_service = WeeklyShiftTemplateService()

class WeeklyShiftTemplateListView(APIView):
    def get(self, request, format=None):
        """
        List all weekly shift template.
        """
        result = template_service.get_all_weekly_shift_template(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateWeeklyShiftTemplateView(APIView):
    def post(self, request, format=None):
        """
        Create weekly shift template.
        """
        result = template_service.create_weekly_shift_template(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update weekly shift template
        """
        result = template_service.update_weekly_shift_template(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get weekly shift template detail by id
        """
        result = template_service.get_weekly_shift_template_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete weekly shift template detail by id
        """
        result = template_service.delete_weekly_shift_template(request, id, format=None)
        return Response(result, status=result["code"])
        



class TemplateDetailsListView(APIView):
    def get(self, request, format=None):
        """
        List all weekly shift template.
        """
        result = template_service.get_all_template_details(request, format=None)
        return Response(result, status=result["code"])


class CreateUpdateTemplateDetailsView(APIView):
    def post(self, request, format=None):
        """
        Create weekly shift template details
        """
        result = template_service.create_template_details(request, format=None)
        return Response(result, status=result["code"])

    def put(self, request, id, format=None):
        """
        Update weekly shift template details
        """
        result = template_service.update_template_details(request, id, format=None)
        return Response(result, status=result["code"])
    
    def get(self, request, id, format=None):
        """
        get weekly shift template detail by id
        """
        result = template_service.get_template_details_by_id(request, id, format=None)
        return Response(result, status=result["code"])
    
    def delete(self, request, id, format=None):
        """
        delete weekly shift template detail by id
        """
        result = template_service.delete_template_details(request, id, format=None)
        return Response(result, status=result["code"])