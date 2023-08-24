from rest_framework import serializers
from api.models import Jobs



class CreateUpdateJobSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of jobs
    """
    class Meta:
        model = Jobs
        fields = ('id', 'name', 'priority', 'due_date', 'customer', 'description', 'note', 'planned_start', 'planned_end')
        
    

class GetJobsDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of jobs
    """
    class Meta:
        model = Jobs
        fields = ('id', 'name', 'priority', 'due_date', 'customer', 'description', 'note', 'planned_start', 'planned_end', 'is_active', 'is_deleted')
    