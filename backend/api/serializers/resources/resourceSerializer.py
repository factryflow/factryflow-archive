from rest_framework import serializers
from api.models import Resources, ResourceGroups



class CreateUpdateResourceSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of Resource
    """
    class Meta:
        model = Resources
        fields = ('id', 'name', 'resource_groups_list')
        
    

class GetResourcesDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Resource
    """
    class Meta:
        model = Resources
        fields = ('id', 'name', 'resource_groups_list', 'is_active', 'is_deleted')
    
 
class GetSearchResourcesDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Resource for search
    """
    type = serializers.SerializerMethodField()
    class Meta:
        model = Resources
        fields = ('id', 'name', 'type')
    
    def get_type(self, obj):
        return "resource"
        
           
class CreateUpdateResourceGroupSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of Resource
    """
    class Meta:
        model = ResourceGroups
        fields = ('id', 'name', 'resources_list')
        
    

class GetResourceGroupsDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Resource
    """
    class Meta:
        model = ResourceGroups
        fields = ('id', 'name', 'resources_list', 'is_active', 'is_deleted')
        

class GetSearchResourceGroupsDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Resource groups for search
    """
    type = serializers.SerializerMethodField()
    class Meta:
        model = ResourceGroups
        fields = ('id', 'name', 'type')
        
    def get_type(self, obj):
        return "resource_group"