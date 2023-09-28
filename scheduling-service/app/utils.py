from factryengine import Task


def get_resources(resources_dict, resource_ids):
    return [resources_dict[res_id] for res_id in resource_ids]


def create_tasks_dict(input_tasks, resources):
    return {
        task_data.id: Task(
            resources=get_resources(resources, task_data.resource_ids),
            **task_data.dict(exclude={"resource_ids", "predecessor_ids"})
        )
        for task_data in input_tasks
    }


def set_predecessors(input_tasks, tasks_dict):
    for task_data in input_tasks:
        if not task_data.predecessor_ids:
            continue
        task = tasks_dict[task_data.id]
        task.predecessors = [
            tasks_dict[pred_id] for pred_id in task_data.predecessor_ids
        ]
