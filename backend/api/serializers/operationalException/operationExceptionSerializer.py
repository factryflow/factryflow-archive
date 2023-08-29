from rest_framework import serializers
from api.models import OperationalExceptionType, OperationalException



class CreateUpdateOperationalExceptionTypeSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of jobs
    """
    class Meta:
        model = OperationalExceptionType
        fields = ('id', 'name')
        
    

class GetOperationalExceptionTypeDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of jobs
    """
    class Meta:
        model = OperationalExceptionType
        fields = ('id', 'name', 'is_active', 'is_deleted')
    
    
class CreateUpdateOperationalExceptionSerializer(serializers.ModelSerializer):
    """
    Create/Update Exception Serializer
    """
    class Meta:
        model = OperationalException
        fields = ('id', 'exception_type', 'start_datetime', 'end_datetime', 'notes')
    

class GetOperationalExceptionSerializer(serializers.ModelSerializer):
    """
    Get details of Exception Serializer
    """
    class Meta:
        model = OperationalException
        fields = ('id', 'exception_type', 'start_datetime', 'end_datetime', 'notes', 'is_active', 'is_deleted')