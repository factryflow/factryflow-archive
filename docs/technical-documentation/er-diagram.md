# ER diagram

Simiplified ER Diagram

``` mermaid
erDiagram
    job |o--o{ task : "consists of"
    job }o--o{ dependency: "has"
    task }o--o{ dependency : "has"
    task_resource_assignment || -- o{ task : "has assignments"
    task_resource_assignment || -- o{ resource : "is assigned to tasks"
    resource }o--o{ resource_group : "part of"
    resource ||--|| weekly_shift_template : "has"
    operational_exception ||--o{ resource: "affects"
    operational_exception |o--o{ weekly_shift_template: "can use"
    assignment_rule }o--o{ resource_group: "targets"
```
