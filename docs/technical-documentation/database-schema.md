# Database Schema

All tables will have the following metadata fields:

| data_type | field_name  |
|----------|-------------|
| datetime | updated_at  |
| boolean  | is_active   |
| boolean  | is_deleted  |
| datetime | deleted_at  |

## Assignment Rule Table

``` mermaid
erDiagram
  assignment_rule {
        int id PK
        string name
        string description
        int priority
        int resource_count
        bool use_all_resources
    }
```



## Assignment Rule Criteria Table

``` mermaid
erDiagram
    assignment_rule_criteria {
        int id PK
        int parent_id "Parent criteria ID if any"
        string field "Task field associated with the criteria."  
        enum operator "Operator used for the criteria (e.g., `equals`, `less_than`)"
        string value "Value of the criteria."
        int assignment_rule_id FK
    }
```

## Assignment Rule Resource Group Table

``` mermaid
erDiagram
  assignment_rule_resource_group {
        int assigment_rule_id PK,FK
        int resource_group_id PK,FK
    }
```

## Dependency Table

``` mermaid
erDiagram
    dependency {
        int id PK 
        string external_id
        string name
        int dependency_status_id FK
        int dependency_type_id FK
        datetime expected_close_datetime
        datetime actual_close_datetime
        string notes
    }
```

## Dependency Status Table

``` mermaid
erDiagram
    dependency_status {
        int id PK 
        string name
    }
```

## Dependency Type Table

``` mermaid
erDiagram
    dependency_type {
        int id PK 
        string name

    }
```

## Job Table

``` mermaid
erDiagram
    job {
        int id PK 
        string name
        string description
        string customer "Customer associated with the job."
        date due_date "Due date for the job completion."
        timestamp planned_start_datetime "Populated by schedule-run"
        timestamp planned_end_datetime "Populated by schedule-run"
        string external_id "External Identifier for the job."
        string notes "Additional notes or comments about the job."
        int job_status_id FK
        int job_type_id FK
    }
```

## Job Dependency

``` mermaid
erDiagram
    job_dependency {
        int job_id PK,FK
        int dependency_id PK,FK
    }
```

## Job Status Table

``` mermaid
erDiagram
    job_status {
        int id PK 
        string name
    }
```

## Job Type Table

``` mermaid
erDiagram
    job_type {
        int id PK 
        string name
    }
```

## Operation Exception Table

``` mermaid
erDiagram
    operational_exception {
        int id PK 
        string external_id
        datetime start_datetime
        datetime end_datetime
        string notes
        int weekly_shift_template_id FK
        int operational_exception_type_id
    }
```

## Operation Exception Type Table

``` mermaid
erDiagram
    operational_exception_type {
        int task_id PK,FK
        int dependency_id PK,FK
    }
```

## Resource Table

``` mermaid
erDiagram
    resource {
        int id PK 
        string name
    }
```

## Resource Group Table

``` mermaid
erDiagram
    resource_group {
        int id PK 
        string name
    }
```

## Schedule Run Table

``` mermaid
erDiagram
    schedule_run_table {
        int id PK 
        datetime triggered_on
        int schedule_status_id FK
    }
```

## Schedule Run Status Table

``` mermaid
erDiagram
    schedule_run_status {
        int id PK 
        string name
    }
```

## Task Table

``` mermaid
erDiagram
    task {
        int id PK
        string name
        int task_status FK 
        int quantity
        int setup_time
        int run_time_per_unit 
        int teardown_time
        datetime planned_start_datetime "Populated by schedule-run"
        datetime planned_end_datetime "Populated by schedule-run"
        string item "The item which is produced"
        int task_status_id FK
        int task_type_id FK
        int job_id FK "The associated job, NULLABLE"
    }
```

## Task Dependency

``` mermaid
erDiagram
    task_dependency {
        int task_id PK,FK
        int dependency_id PK,FK
    }
```

## Task Relationship Table

``` mermaid
erDiagram
    task_relaationship {
        int predecessor_id PK,FK "id of task"
        string successor_id PK,FK "id of task"
    }
```

## Task Resource Assigment Table

``` mermaid
erDiagram
    task_resource_assigment {
        int task_id PK,FK
        string resource_id PK,FK
    }
```

## Task Status Table

``` mermaid
erDiagram
    task_status {
        int id PK 
        string name
    }
```

## Task Type Table

``` mermaid
erDiagram
    task_type {
        int id PK 
        string name
    }
```

## User Table

``` mermaid
erDiagram
    user {
        int id PK 
        string first_name
        string last_name
        sting email
        sting password
        int user_role_id fk
    }
```

## User Role Table

``` mermaid
erDiagram
    user_role {
        int id PK 
        string name
    }
```

## Weekly Shift Template Table

``` mermaid
erDiagram
    weekly_shift_template {
        int id PK 
        string name
    }
```

## Weekly Shift Template Detail Table

``` mermaid
erDiagram
    weekly_shift_template_detail {
        int id PK 
        int day_of_week
        time start_time
        time end_time
        int weekly_shift_template_id FK
    }
```
