from api.models import WeeklyShiftTemplate, WeeklyShiftTemplateDetail
from api.serializers.weeklyShiftTemplate import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.weeklyShiftTemplateMessages import *
from .weeklyShiftTemplateBaseService import WeeklyShiftTemplateBaseService


class WeeklyShiftTemplateService(WeeklyShiftTemplateBaseService):
    """
    Create, Retrieve, Update or Delete a weekly shift template instance and Return all weekly shift template.
    """

    def __init__(self):
        pass

    def get_all_weekly_shift_template(self, request, format=None):
        """
        Retun all the WeeklyShiftTemplate
        """
        template_obj = WeeklyShiftTemplate.objects.all()
        serializer = GetWeeklyShiftTemplateDetailsSerializer(template_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_weekly_shift_template(self, request, format=None):
        """
        Create New weekly shift template
        """
        serializer = CreateUpdateWeeklyShiftTemplateSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            template_obj = WeeklyShiftTemplate.objects.get(id=serializer.data["id"])
            serializer = GetWeeklyShiftTemplateDetailsSerializer(template_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": WEEKLY_SHIFT_TEMPLATE_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_weekly_shift_template(self, request, id, format=None):
        """
        Update WeeklyShiftTemplate details
        """
        try:
            template_obj = WeeklyShiftTemplate.objects.get(id=id)
            serializer = CreateUpdateWeeklyShiftTemplateSerializer(template_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetWeeklyShiftTemplateDetailsSerializer(template_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": WEEKLY_SHIFT_TEMPLATE_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except WeeklyShiftTemplate.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_weekly_shift_template_by_id(self, request, id, format=None):
        """
        Get weekly shift template details by id
        """
        try:
            template_obj = WeeklyShiftTemplate.objects.get(id=id)
            serializer = GetWeeklyShiftTemplateDetailsSerializer(template_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except WeeklyShiftTemplate.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_weekly_shift_template(self, request, id, format=None):
        """
        delete weekly shift template details
        """
        try:
            template_obj = WeeklyShiftTemplate.objects.get(id=id)
            template_obj.is_deleted = True
            template_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":WEEKLY_SHIFT_TEMPLATE_DELETED})
        except WeeklyShiftTemplate.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
    
    
    # Weekly Shift template details
    def get_all_template_details(self, request, format=None):
        """
        Retun all the WeeklyShiftTemplate
        """
        template_obj = WeeklyShiftTemplateDetail.objects.all()
        serializer = GetTemplateDetailsSerializer(template_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def get_weekly_shift_details_by_template_id(self, request, template_id, format=None):
        """
        Retun all the WeeklyShiftTemplate details by template id 
        """
        template_obj = WeeklyShiftTemplateDetail.objects.filter(template__id=template_id)
        serializer = GetTemplateDetailsSerializer(template_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_template_details(self, request, format=None):
        """
        Create New weekly shift template
        """
        serializer = CreateUpdateTemplateDetailsSerializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            template_obj = WeeklyShiftTemplateDetail.objects.get(id=serializer.data["id"])
            serializer = GetTemplateDetailsSerializer(template_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": WEEKLY_SHIFT_TEMPLATE_DETAILS_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})


    def update_template_details(self, request, id, format=None):
        """
        Update WeeklyShiftTemplateDetail details
        """
        try:
            template_obj = WeeklyShiftTemplateDetail.objects.get(id=id)
            serializer = CreateUpdateTemplateDetailsSerializer(template_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetTemplateDetailsSerializer(template_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": WEEKLY_SHIFT_TEMPLATE_DETAILS_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except WeeklyShiftTemplateDetail.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_template_details_by_id(self, request, id, format=None):
        """
        Get weekly shift template details by id
        """
        try:
            template_obj = WeeklyShiftTemplateDetail.objects.get(id=id)
            serializer = GetTemplateDetailsSerializer(template_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except WeeklyShiftTemplateDetail.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_template_details(self, request, id, format=None):
        """
        delete weekly shift template details
        """
        try:
            template_obj = WeeklyShiftTemplateDetail.objects.get(id=id)
            template_obj.is_deleted = True
            template_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":WEEKLY_SHIFT_TEMPLATE_DETAILS_DELETED})
        except WeeklyShiftTemplateDetail.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})