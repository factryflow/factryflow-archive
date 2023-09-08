from rest_framework import serializers
from api.models import ScheduleRun



class CreateUpdateScheduleRunerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of ScheduleRun
    """
    class Meta:
        model = ScheduleRun
        fields = ('id', 'triggered_on', 'triggered_by')
        
    

class GetScheduleRunDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of ScheduleRun
    """
    class Meta:
        model = ScheduleRun
        fields = ('id', 'triggered_on', 'triggered_by', 'is_active', 'is_deleted')
    