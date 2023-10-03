# schemas.py
from datetime import datetime, date
from typing import Optional
from api.models import Jobs, JobStatus, JobType, JobDependency
from ninja import Schema, ModelSchema



class JobTypeIn(Schema):
    id:int
    
class JobStatusIn(Schema):
    id:int
    
class JobIn(Schema):
    name: str
    description: Optional[str] = None
    customer: Optional[str] = None
    due_date: date
    priority: int
    planned_start_datetime: datetime
    planned_end_datetime: datetime
    external_id: str
    note: Optional[str] = None
    job_status: JobStatusIn
    job_type: JobTypeIn
    


class JobOut(ModelSchema):
    class Config:
        model = Jobs
        model_fields = ["id", "name", "description",  "customer", "due_date", "priority", "planned_start_datetime", "planned_end_datetime", "external_id", "note", "job_status", "job_type", "created_at", "created_by", "updated_at", "updated_by", "is_active", "is_deleted"]


class JobTypeOut(ModelSchema):
    class Config:
        model = JobType
        model_fields = ["id", "name"]
        

class JobStatusOut(ModelSchema):
    class Config:
        model = JobStatus
        model_fields = ["id", "name", "created_at", "created_by", "updated_at", "updated_by", "is_active", "is_deleted"]
