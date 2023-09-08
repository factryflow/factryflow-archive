from rest_framework import serializers
from api.models import TasksResourceAssignment


class CreateUpdateTaskResourceAssignmentSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of Tasks resource assignment
    """
    class Meta:
        model = TasksResourceAssignment
        fields = ('id', 'task', 'resource')
        
    

class GetTaskResourceAssignmentDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Tasks resource assignment
    """
    class Meta:
        model = TasksResourceAssignment
        fields = ('id', 'task', 'resource', 'is_active', 'is_deleted')
