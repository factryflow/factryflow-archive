# ER diagram

``` mermaid
erDiagram
    JOB |o--o{ TASK : "can have"
    JOB }o--o{ DEPENDENCY: "has"
    JOB {
        int id
        string name
        date due_date
        string description
        string customer
        string notes
        datetime planned_start_datetime
        datetime planned_end_datetime
    }
    TASK }o--o{ DEPENDENCY : "has"
    TASK }o--o{ TASK-TO-TASK : "has"
    TASK ||--|{ RESOURCE-GROUP : "requires"
    TASK {
        int id
        string name
        enum status
        int quantity
        int setup_time
        int run_time_per_unit
        int teardown_time
        datetime planned_start_datetime
        datetime planned_end_datetime
    }
    TASK-TO-TASK {
        int predecessor_id FK
        int successor_id FK
    }

    RESOURCE }o--o{ RESOURCE-GROUP : "part of"
    RESOURCE ||--|| WEEKLY-SHIFT-TEMPLATE : "has"
    RESOURCE {
        int id PK
        string name
    }
    RESOURCE-GROUP {
        int id
        string name
    }
    DEPENDENCY ||--|{ DEPENDENCY-TYPE : "has"
    DEPENDENCY {
        int id
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

    OPERATIONAL-EXCEPTION ||--o{ RESOURCE: "applies to"
    OPERATIONAL-EXCEPTION |o--o{ WEEKLY-SHIFT-TEMPLATE: "can have"
    OPERATIONAL-EXCEPTION ||--|| OPERATIONAL-EXCEPTION-TYPE: "has"
    OPERATIONAL-EXCEPTION {
        datetime start_datetime
        datetime end_datetime
        string notes
    }

    OPERATIONAL-EXCEPTION-TYPE {
        int id
        string name
    }
```