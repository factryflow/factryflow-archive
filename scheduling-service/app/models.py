from typing import List

from pydantic import BaseModel


class TaskCreate(BaseModel):
    id: int
    duration: int
    priority: int
    resource_ids: List[int]
    predecessor_ids: List[int] = []


class ResourceCreate(BaseModel):
    id: int
    available_windows: List[tuple[int, int]] = []
    efficiency_multiplier: float = 1


class ScheduleInput(BaseModel):
    tasks: List[TaskCreate]
    resources: List[ResourceCreate]
