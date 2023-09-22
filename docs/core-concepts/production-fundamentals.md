# Production Fundamentals

This section delves into the core elements that make up the production process in FactryFlow. From tasks and jobs to dependencies and priorities, you'll learn how each component interacts to create a seamless workflow.

## Jobs

In FactryFlow, a "Job" represents a specific production order or project that needs to be completed. Each job is a collection of various tasks that contribute to the production of a particular item or set of items. Jobs can vary in complexity, from simple, single-step processes to multi-stage operations requiring various resources and tasks.

For example, consider a job that involves producing 100 units of a metal component. This job might include tasks like cutting metal sheets, welding, and quality inspection. Each of these tasks contributes to the completion of the job and may need to be executed in a specific sequence for the job to be successful.

## Tasks

A "Task" is an individual operation or step that is part of a larger job. Tasks are the granular units of work to which resources are allocated. Each task has its own set of requirements, such as the type of resource needed and the time required for completion. In FactryFlow, tasks are organized using predecessors and successors to determine the order in which they should be executed.

Continuing with our example of producing 100 units of a metal component, one of the tasks might be "Cutting Metal Sheets." This task would be a predecessor to the "Welding" task, meaning that the cutting needs to be completed before welding can begin.

## Priority-Based Scheduling

In FactryFlow, each job is assigned a priority level. This priority determines the order in which jobs are scheduled and executed. Higher-priority jobs are placed at the front of the queue, ensuring they get the resources and attention they need before lower-priority jobs. This allows you to focus on what's most important and ensures that critical jobs are completed on time.

## Dependencies

In FactryFlow, "Dependencies" are external factors or prerequisites that can affect the scheduling and completion of jobs and tasks. Unlike task predecessors and successors, which dictate the internal sequence of tasks, dependencies are external conditions that must be met. These could include the delivery of raw materials needed for a task or the completion of technical drawings before manufacturing can commence.

For instance, the task of "Welding" in our example job might have a dependency on the delivery of specialized welding rods. Another dependency could be the completion of technical drawings before any manufacturing task can begin. These dependencies are crucial to account for in your production planning, as they can significantly impact your schedule.
