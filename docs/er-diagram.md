# ER diagram

``` mermaid
erDiagram
    JOB |o--o{ TASK : "consists of"
    JOB }o--o{ DEPENDENCY: "has"
    JOB {
        int id
        string external_id
        string name
        date due_date
        string description
        string customer
        string notes
        timestamp planned_start_datetime
        timestamp planned_end_datetime
    }
    TASK }o--o{ DEPENDENCY : "has"
    TASK }o--o{ TASK-TO-TASK : "links to"
    TASK {
        int id
        string external_id
        string name
        enum status
        int quantity
        int setup_time
        int run_time_per_unit
        int teardown_time
        timestamp planned_start_datetime
        timestamp planned_end_datetime
    }

    TASK-RESOURCE-ASSIGNMENT || -- o{ TASK : "has assignments"
    TASK-RESOURCE-ASSIGNMENT || -- o{ RESOURCE : "is assigned to tasks"
    TASK-RESOURCE-ASSIGNMENT {
        int task_id FK
        int resource_id FK
    }

    TASK-TO-TASK {
        int predecessor_id FK
        int successor_id FK
    }

    RESOURCE }o--o{ RESOURCE-GROUP : "part of"
    RESOURCE ||--|| WEEKLY-SHIFT-TEMPLATE : "has"
    RESOURCE {
        int id PK
        string external_id
        string name
    }

    RESOURCE-GROUP {
        int id
        string external_id
        string name
    }
    DEPENDENCY ||--|{ DEPENDENCY-TYPE : "has"
    DEPENDENCY {
        int id
        string external_id
        string name
        enum status
        datetime expected_close_datetime
        datetime actual_close_datetime
        string notes
    }

    DEPENDENCY-TYPE {
        int id
        string name
    }

    WEEKLY-SHIFT-TEMPLATE ||--|{ WEEKLY-SHIFT-TEMPLATE-DETAIL: "has"
    WEEKLY-SHIFT-TEMPLATE {
        int id
        string name
    }
    WEEKLY-SHIFT-TEMPLATE-DETAIL {
        int id
        int day_of_week
        time start_time
        time end_time
    }

    OPERATIONAL-EXCEPTION ||--o{ RESOURCE: "affects"
    OPERATIONAL-EXCEPTION |o--o{ WEEKLY-SHIFT-TEMPLATE: "can use"
    OPERATIONAL-EXCEPTION ||--|| OPERATIONAL-EXCEPTION-TYPE: "has"
    OPERATIONAL-EXCEPTION {
        int id
        string external_id
        datetime start_datetime
        datetime end_datetime
        string notes
    }

    OPERATIONAL-EXCEPTION-TYPE {
        int id
        string name
    }

    ASSIGNMENT-RULE }o--o{ RESOURCE-GROUP: "targets"
    ASSIGNMENT-RULE || -- || TASK: "applies to"
    ASSIGNMENT-RULE {
        int id
        string name
        string description
        int priority 
        int resource_count
        bool use_all_resources
    }

    ASSIGNMENT-RULE-CRITERIA }| -- o| ASSIGNMENT-RULE: "applies to"
    ASSIGNMENT-RULE-CRITERIA {
        int id
        int parent_id
        string field
        enum operator
        string value
    }

    SCHEDULE-RUN || -- || USER: "triggered by"
    SCHEDULE-RUN {
        int id
        timestamp triggered_on
    }
```
