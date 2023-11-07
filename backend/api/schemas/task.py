# schemas.py
from typing import List

from ninja import ModelSchema
from pydantic import BaseModel, Field, root_validator

from api.models import Task, TasksResourceAssignment
from api.schemas.base import DependencyBaseOut, TaskBaseOut


class TaskResourceAssignmentIn(BaseModel):
    resource_group_id: int
    resource_ids: List[int] = Field(default=[])
    resource_count: int = Field(default=None, gt=0)
    use_all_resources: bool = False

    @root_validator(pre=True, allow_reuse=True)
    def check_combinations(cls, values):
        resource_ids = values.get("resource_ids")
        resource_group_id = values.get("resource_group_id")
        resource_count = values.get("resource_count")
        use_all_resources = values.get("use_all_resources")

        if resource_ids:
            if resource_group_id != 1:
                raise ValueError(
                    'If "resource_ids" is set, "resource_group_id" must be 1.'
                )
            if any([resource_count, use_all_resources]):
                raise ValueError(
                    'If "resource_ids" is set, neither "resource_count" nor "use_all_resources" should be set.'
                )

        if use_all_resources and any([resource_ids, resource_count]):
            raise ValueError(
                'If "use_all_resources" is true, neither "resource_ids" nor "resource_count" should be set.'
            )

        if not any([resource_ids, resource_count, use_all_resources]):
            raise ValueError(
                'At least one of "resource_ids", "resource_count", or "use_all_resources" should be set.'
            )

        return values


class TaskIn(ModelSchema):
    task_status_id: int
    task_type_id: int
    job_id: int = None
    work_center_id: int = Field(None, example=1)
    item_id: int = None
    predecessor_ids: List[int] = Field(default=[])
    successor_ids: List[int] = Field(default=[])
    dependency_ids: List[int] = Field(default=[])
    resource_assignmentss: List[TaskResourceAssignmentIn]

    class Config:
        model = Task
        model_fields = [
            "name",
            "external_id",
            "setup_time",
            "run_time_per_unit",
            "teardown_time",
            "quantity",
        ]


class TaskResourceAssignmentOut(ModelSchema):
    class Config:
        model = TasksResourceAssignment
        model_fields = ["id", "resource_group", "resource_count", "resources"]


class TaskOut(TaskBaseOut):
    predecessors: List[TaskBaseOut]
    successors: List[TaskBaseOut]
    dependencies: List[DependencyBaseOut]
    resource_assignments: List[TaskResourceAssignmentOut]
    # assignment_rules: List[AssignmentRuleBaseOut]

    class Config:
        model = Task
        model_fields = "__all__"
