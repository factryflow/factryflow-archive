from rest_framework import serializers
from api.models import OperationalExceptionType, OperationalException
from api.serializers.weeklyShiftTemplate import GetWeeklyShiftTemplateDetailsSerializer


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
        fields = ('id', 'external_id', 'operational_exception_type', 'start_datetime', 'end_datetime', 'notes', 'weekly_shift_template')
    

class GetOperationalExceptionSerializer(serializers.ModelSerializer):
    """
    Get details of Exception Serializer
    """
    operational_exception_type = GetOperationalExceptionTypeDetailsSerializer()
    weekly_shift_template = GetWeeklyShiftTemplateDetailsSerializer()
    class Meta:
        model = OperationalException
        fields = ('id', 'external_id', 'operational_exception_type', 'start_datetime', 'end_datetime', 'notes', 'weekly_shift_template', 'is_active', 'is_deleted')