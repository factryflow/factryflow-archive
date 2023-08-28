from rest_framework import serializers
from api.models import DependencyTypes, Dependency


class CreateUpdateDependencyTypeSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of Dependency Types
    """
    class Meta:
        model = DependencyTypes
        fields = ('id', 'name', 'description')
        
    

class GetDependencyTypeDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Dependency Types
    """
    class Meta:
        model = DependencyTypes
        fields = ('id', 'name', 'description')
    
    
class CreateUpdateDependencySerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of Dependency
    """
    class Meta:
        model = Dependency
        fields = ('id', 'name', 'dependency_type', 'dependency_status', 'expected_closed', 'closed_date', 'notes', 'jobs', 'tasks')
        
    

class GetDependencyDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Dependency
    """
    class Meta:
        model = Dependency
        fields = ('id', 'name', 'dependency_type', 'dependency_status', 'expected_closed', 'closed_date', 'notes', 'jobs', 'tasks', 'is_active', 'is_deleted')
    