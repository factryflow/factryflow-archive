from rest_framework import serializers
from api.models import DependencyTypes, Dependency, DependencyStatus


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
    

class CreateGetUpdateDependencyStatusSerializer(serializers.ModelSerializer):
    """This serializer is for Create/Get/Update for dependency status"""
    class Meta:
        model = DependencyStatus
        fields = ("id", "name")

class CreateUpdateDependencySerializer(serializers.ModelSerializer):
    """
    This is for update/Create of Dependency
    """
    class Meta:
        model = Dependency
        fields = ('id', 'name', 'dependency_type', 'dependency_status', 'expected_close_datetime', 'actual_close_datetime', 'notes', 'external_id')
        
    

class GetDependencyDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Dependency
    """
    dependency_status = CreateGetUpdateDependencyStatusSerializer()
    class Meta:
        model = Dependency
        fields = ('id', 'name', 'dependency_type', 'dependency_status', 'expected_close_datetime', 'actual_close_datetime', 'notes', 'external_id', 'is_active', 'is_deleted')
    