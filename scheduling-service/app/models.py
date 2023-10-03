from typing import List

from pydantic import BaseModel


class TaskCreate(BaseModel):
    id: int
    duration: int
    priority: int
    resource_ids: List[int]
    predecessor_ids: List[int] = []
    resource_count: int = 1


class ResourceCreate(BaseModel):
    id: int
    available_windows: List[tuple[int, int]] = []


class ScheduleInput(BaseModel):
    tasks: List[TaskCreate]
    resources: List[ResourceCreate]
