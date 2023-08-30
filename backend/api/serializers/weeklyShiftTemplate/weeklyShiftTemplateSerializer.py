from rest_framework import serializers
from api.models import WeeklyShiftTemplate, WeeklyShiftTemplateDetail



class CreateUpdateWeeklyShiftTemplateSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of weekly shift template
    """
    class Meta:
        model = WeeklyShiftTemplate
        fields = ('id', 'name')
        
    

class GetWeeklyShiftTemplateDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of weekly shift template
    """
    class Meta:
        model = WeeklyShiftTemplate
        fields = ('id', 'name', 'is_active', 'is_deleted')
    



class CreateUpdateTemplateDetailsSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of weekly shift template
    """
    class Meta:
        model = WeeklyShiftTemplateDetail
        fields = ('id', 'template', 'day_of_week', 'start_time', 'end_time')
        
    

class GetTemplateDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of weekly shift template
    """
    class Meta:
        model = WeeklyShiftTemplateDetail
        fields = ('id', 'template', 'day_of_week', 'start_time', 'end_time', 'is_active', 'is_deleted')
    