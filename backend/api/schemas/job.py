# schemas.py
from datetime import datetime, date
from typing import Optional
from api.models import Job, JobStatus, JobType
from ninja import Schema, ModelSchema

    
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
    job_status_id: int
    job_type_id: int
    


class JobOut(ModelSchema):
    class Config:
        model = Job
        model_fields = "__all__"


class JobTypeOut(ModelSchema):
    class Config:
        model = JobType
        model_fields = ["id", "name"]
        

class JobStatusOut(ModelSchema):
    class Config:
        model = JobStatus
        model_fields = "__all__"
