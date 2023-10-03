from rest_framework import serializers
from api.models import Job, JobType, JobStatus, JobDependency

class CreateGetUpdateJobStatusSerializer(serializers.ModelSerializer):
    """Create/Update and get details of job status"""
    class Meta:
        model = JobStatus
        fields =("id", "name")
        

class CreateGetUpdateJobTypeSerializer(serializers.ModelSerializer):
    """Create/Update and get details of job Type"""
    class Meta:
        model = JobType
        fields =("id", "name")
        
        
class CreateUpdateJobSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create of jobs
    """
    class Meta:
        model = Job
        fields = ('id', 'name', 'priority', 'due_date', 'customer', 'description', 'note', 'planned_start_datetime', 'planned_end_datetime', 'external_id', 'job_status', 'job_type')
        
    

class GetJobsDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of jobs
    """
    job_type = CreateGetUpdateJobTypeSerializer()
    job_status = CreateGetUpdateJobStatusSerializer()
    class Meta:
        model = Job
        fields = ('id', 'name', 'priority', 'due_date', 'customer', 'description', 'note', 'planned_start_datetime', 'planned_end_datetime', 'external_id', 'job_status', 'job_type', 'is_active', 'is_deleted')
    
    

class GetSearchJobDetailsSerializer(serializers.ModelSerializer):
    """
    This is for get the details of jobs for search list
    """
    type = serializers.SerializerMethodField()
    class Meta:
        model = Job
        fields = ('id', 'name', 'type')
    
    def get_type(self, obj):
        return "job"
    

class CreateUpdateJobDependencySerializer(serializers.ModelSerializer):
    """Create/update job depedency Serializer"""
    class Meta:
        model = JobDependency
        fields = ("id", "job", "dependency")
    