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
    Resource,
    ResourceGroup,
    Task,
    TaskStatus,
    TaskType,
    WeeklyShiftTemplate,
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


# ====================================
# =============== Resource ===============
# ====================================


class ResourceBaseOut(ModelSchema):
    resource_group_ids: List[int] = Field([], alias="resource_group_id_list")
    weekly_shift_template_id: int = None

    class Config:
        model = Resource
        model_exclude = ["resource_groups", "weekly_shift_template"]


# ====================================
# =============== ResourceGroup ===============
# ====================================


class ResourceGroupBaseOut(ModelSchema):
    resource_ids: List[int] = Field([], alias="resource_id_list")

    class Config:
        model = ResourceGroup
        model_fields = "__all__"


# ====================================
# =============== WeeklyShiftTemplate ===============
# ====================================


class WeeklyShiftTemplateBaseOut(ModelSchema):
    resource_ids: List[int] = Field([], alias="resource_id_list")

    class Config:
        model = WeeklyShiftTemplate
        model_fields = "__all__"