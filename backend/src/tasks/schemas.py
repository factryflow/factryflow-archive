from pydantic import BaseModel

class TaskBase(BaseModel):
    name: str
    job_id: int

class TaskCreate(BaseModel):
    name: str
    job_id: int


class TaskRead(BaseModel):
    id: int
    name: str
    job_id: int


class TaskCreatedResponse(BaseModel):
    message: str
    task: TaskRead


class TaskDeletedResponse(BaseModel):
    message: str
