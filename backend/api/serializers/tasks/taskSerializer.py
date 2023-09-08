from rest_framework import serializers
from api.models import Tasks



class CreateUpdateTaskSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of Tasks
    """
    class Meta:
        model = Tasks
        fields = ('id', 'external_id', 'name', 'task_status', 'set,up_time', 'run_time_per_unit', 'teardown_time', 'quantity', 'jobs', 'predecessors', 'item', 'planned_start_datetime', 'planned_end_datetime')
        
    

class GetTaskDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Tasks
    """
    class Meta:
        model = Tasks
        fields = ('id', 'external_id', 'name', 'task_status', 'setup_time', 'run_time_per_unit', 'teardown_time', 'quantity', 'jobs', 'predecessors', 'item', 'planned_start_datetime', 'planned_end_datetime', 'is_active', 'is_deleted')


class GetSearchTaskDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Tasks for search
    """
    type = serializers.SerializerMethodField()
    class Meta:
        model = Tasks
        fields = ('id', 'name', 'type')
    
    def get_type(self, obj):
        return "task"