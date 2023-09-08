from rest_framework import serializers
from api.models import AssignmentRule, AssignmentRuleCriteria



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
    
    


class CreateUpdateAssignmentRuleCriteriaSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of AssignmentRuleCriteria
    """
    class Meta:
        model = AssignmentRuleCriteria
        fields = ('id', 'field', 'operator', 'value', 'parent', 'assignment_rule')
        
    

class GetAssignmentRuleCriteriaDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of AssignmentRuleCriteria
    """
    class Meta:
        model = AssignmentRuleCriteria
        fields = ('id', 'field', 'operator', 'value', 'parent', 'assignment_rule', 'is_active', 'is_deleted')