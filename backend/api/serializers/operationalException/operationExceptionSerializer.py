from rest_framework import serializers
from api.models import OperationalExceptionType



class CreateUpdateJobSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of jobs
    """
    class Meta:
        model = OperationalExceptionType
        fields = ('id', 'name')
        
    

class GetJobsDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of jobs
    """
    class Meta:
        model = OperationalExceptionType
        fields = ('id', 'name', 'is_active', 'is_deleted')
    