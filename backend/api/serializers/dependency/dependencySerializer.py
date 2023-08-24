from rest_framework import serializers
from api.models import DependencyTypes, Dependency



class CreateUpdateDependenctTypeSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of Dependenct Types
    """
    class Meta:
        model = DependencyTypes
        fields = ('id', 'name', 'description')
        
    

class GetDependencyTypeDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of Dependenct Types
    """
    class Meta:
        model = DependencyTypes
        fields = ('id', 'name', 'description')
    