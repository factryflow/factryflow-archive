from factryengine import Resource, Scheduler
from fastapi import FastAPI, HTTPException
from models import ScheduleInput
from utils import create_tasks_dict, set_predecessors

app = FastAPI()


@app.post("/run-schedule/")
async def schedule(input: ScheduleInput):
    # Create resources
    resources = {res.id: Resource(**res.dict()) for res in input.resources}

    # Validate unique IDs
    if len(resources) != len(set(res.id for res in input.resources)):
        raise HTTPException(status_code=400, detail="Resource IDs must be unique.")

    # Create tasks and store them in a dictionary for easy lookup
    tasks_dict = create_tasks_dict(input.tasks, resources)

    # Validate unique IDs
    if len(tasks_dict) != len(set(task.id for task in input.tasks)):
        raise HTTPException(status_code=400, detail="Task IDs must be unique.")

    # Set predecessors for each task
    set_predecessors(input.tasks, tasks_dict)

    # Run the scheduler
    scheduler = Scheduler(tasks=list(tasks_dict.values()))
    scheduler_result = scheduler.schedule()

    return {"message": "Scheduling successful", "result": scheduler_result.to_dict()}
