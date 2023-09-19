from rest_framework import serializers
from api.models import ScheduleRun, ScheduleRunStatus

class CreateUpdateScheduleRunStatusSerializer(serializers.ModelSerializer):
    """This is Create/update schedule run status"""
    class Meta:
        model = ScheduleRunStatus
        fields = ("id", "name")

class CreateUpdateScheduleRunerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of ScheduleRun
    """
    class Meta:
        model = ScheduleRun
        fields = ('id', 'triggered_on', 'triggered_by', 'schedule_status')
        
    

class GetScheduleRunDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of ScheduleRun
    """
    schedule_status = CreateUpdateScheduleRunStatusSerializer()
    class Meta:
        model = ScheduleRun
        fields = ('id', 'triggered_on', 'triggered_by', 'schedule_status', 'is_active', 'is_deleted')
    