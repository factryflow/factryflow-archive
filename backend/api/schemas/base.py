# schemas.py

from typing import List

from ninja import ModelSchema
from pydantic.fields import Field

from api.models import (
    Dependency,
    DependencyStatus,
    DependencyTypes,
    Job,
    JobStatus,
    JobType,
    Task,
    TaskStatus,
    TaskType,
)

# ====================================
# ============ DEPENDENCY ============
# ====================================


class DependencyTypeOut(ModelSchema):
    class Config:
        model = DependencyTypes
        model_fields = ["id", "name"]


class DependencyStatusOut(ModelSchema):
    class Config:
        model = DependencyStatus
        model_fields = ["id", "name"]


class DependencyBaseOut(ModelSchema):
    dependency_status: DependencyStatusOut
    dependency_type: DependencyTypeOut

    job_ids: List[int] = Field([], alias="job_id_list")
    task_ids: List[int] = Field([], alias="task_id_list")

    class Config:
        model = Dependency
        model_fields = "__all__"


# ====================================
# =============== JOB ================
# ====================================


class JobStatusOut(ModelSchema):
    class Config:
        model = JobStatus
        model_fields = ["id", "name"]


class JobTypeOut(ModelSchema):
    class Config:
        model = JobType
        model_fields = ["id", "name"]


class JobBaseOut(ModelSchema):
    job_status: JobStatusOut
    job_type: JobTypeOut
    task_ids: List[int] = Field([], alias="task_id_list")
    dependency_ids: List[int] = Field([], alias="dependency_id_list")

    class Config:
        model = Job
        model_exclude = ["dependencies"]


# ====================================
# =============== TASK ===============
# ====================================


class TaskTypeOut(ModelSchema):
    class Config:
        model = TaskType
        model_fields = ["id", "name"]


class TaskStatusOut(ModelSchema):
    class Config:
        model = TaskStatus
        model_fields = ["id", "name"]


class TaskBaseOut(ModelSchema):
    task_status: TaskStatusOut
    task_type: TaskTypeOut
    job_id: int = None
    predecessor_ids: List[int] = Field([], alias="predecessor_id_list")
    dependency_ids: List[int] = Field([], alias="dependency_id_list")

    class Config:
        model = Task
        model_exclude = ["dependencies", "predecessors", "job"]
