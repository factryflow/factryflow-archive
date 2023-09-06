from rest_framework import serializers
from api.models import AssignmentRule



class CreateUpdateAssignmentRuleSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of AssignmentRule
    """
    class Meta:
        model = AssignmentRule
        fields = ('id', 'name', 'description', 'priority', 'resource_count', 'use_all_resources')
        
    

class GetAssignmentRuleDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of AssignmentRule
    """
    class Meta:
        model = AssignmentRule
        fields = ('id', 'name', 'description', 'priority', 'resource_count', 'use_all_resources', 'is_active', 'is_deleted')
    