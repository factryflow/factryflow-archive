# Database Schema

## Job Table

``` mermaid
erDiagram
    jobs {
        int id PK 
        string name
        string description
        string customer "Customer associated with the job."
        date due_date "Due date for the job completion."
        timestamp planned_start_datetime "Populated by schedule-run"
        timestamp planned_end_datetime "Populated by schedule-run"
        string external_id "External Identifier for the job."
        string notes "Additional notes or comments about the job."
        in job_status FK
        list tasks FK "Backreference to related tasks."
        list dependencies FK "Backreference to related dependencies."
        datetime created_at 
        datetime updated_at 
        boolean is_active 
        boolean is_deleted 
        datetime deleted_at 
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

## Task Table

``` mermaid
erDiagram
    tasks {
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
        list predecessors FK
        list successors FK
        int job_id FK "The associated job, NULLABLE"
        datetime created_at 
        datetime updated_at 
        boolean is_active 
        boolean is_deleted 
        datetime deleted_at 
    }
```

## Assignment Rule Table

**Description:** The `assignment_rule` table captures rules for resource assignment.

| Field Name           | Data Type             | Description                                             |
|----------------------|-----------------------|---------------------------------------------------------|
| id                   | int                   | Primary Key. Unique identifier for the rule.            |
| name                 | string                | Name of the rule.                                       |
| description          | string                | Description of the rule.                                |
| priority             | int                   | Priority level of the rule.                             |
| resource_count       | int                   | Number of resources associated.                         |
| use_all_resources    | bool                  | Indicator if all resources are used.                    |
| resource_group       | ForeignKey (One-to-One)| Reference to related resource group.                    |
| tasks                | ForeignKey (Many-to-One) | Backreference to related tasks.                         |
| created_at           | DateTimeField         | Timestamp when the rule was created.                    |
| updated_at           | DateTimeField         | Timestamp when the rule was last updated.               |
| is_active            | BooleanField          | Indicates if the rule is active.                        |
| is_deleted           | BooleanField          | Indicates if the rule has been soft deleted.            |
| deleted_at           | DateTimeField (Nullable)| Timestamp when the rule was soft deleted (null if not deleted).|

---

## Assignment Rule Criteria Table

**Description:** The `assignment_rule_criteria` table holds criteria details for assignment rules.

| Field Name           | Data Type                  | Description                                             |
|----------------------|----------------------------|---------------------------------------------------------|
| id                   | int                        | Primary Key. Unique identifier for the criteria.        |
| parent_id            | int                        | Parent criteria ID if any.                              |
| field                | string                     | Field associated with the criteria.                     |
| operator             | enum                       | Operator used for the criteria (e.g., `equals`, `less_than`).|
| value                | string                     | Value of the criteria.                                  |
| assignment_rule      | ForeignKey (One-to-One)    | Reference to related assignment rule.                   |
| created_at           | DateTimeField              | Timestamp when the criteria was created.                |
| updated_at           | DateTimeField              | Timestamp when the criteria was last updated.           |
| is_active            | BooleanField               | Indicates if the criteria is active.                    |
| is_deleted           | BooleanField               | Indicates if the criteria has been soft deleted.        |
| deleted_at           | DateTimeField (Nullable)   | Timestamp when the criteria was soft deleted (null if not deleted).|

---

## Dependency Table

**Description:** The `dependency` table captures dependencies for tasks and jobs.

| Field Name                | Data Type                  | Description                                        |
|---------------------------|----------------------------|----------------------------------------------------|
| id                        | int                        | Primary Key. Unique identifier for the dependency. |
| external_id               | string                     | External Identifier for the dependency.            |
| name                      | string                     | Name of the dependency.                            |
| status                    | enum                       | Status of the dependency.                          |
| expected_close_datetime   | datetime                   | Expected resolution time and date.                 |
| actual_close_datetime     | datetime                   | Actual resolution time and date.                   |
| notes                     | string                     | Additional notes about the dependency.             |
| job                       | ForeignKey (One-to-One)    | Reference to the associated job.                   |
| tasks                     | ForeignKey (Many-to-One)   | Backreference to related tasks.                    |
| created_at                | DateTimeField              | Timestamp when the dependency was created.         |
| updated_at                | DateTimeField              | Timestamp when the dependency was last updated.    |
| is_active                 | BooleanField               | Indicates if the dependency is active.             |
| is_deleted                | BooleanField               | Indicates if the dependency has been soft deleted. |
| deleted_at                | DateTimeField (Nullable)   | Timestamp when the dependency was soft deleted (null if not deleted).|

---

(For brevity, I've only covered a few tables. Do let me know if you'd like me to proceed with the rest of the tables in the same format!)

## Jobs Table

**Description:** The `jobs` table contains information about various jobs. Each record provides detailed data on the job, such as its name, description, associated customer, and timings.

| Field Name             | Data Type                   | Description                                           |
|------------------------|-----------------------------|-------------------------------------------------------|
| id                     | int                         | Primary Key. Unique identifier for each job.          |
| name                   | string                      | Name or title of the job.                             |
| description            | string                      | Detailed description of the job.                      |
| customer               | string                      | Customer associated with the job.                     |
| due_date               | date                        | Due date for the job completion.                      |
| planned_start_datetime | timestamp                   | Planned starting time and date for the job.           |
| planned_end_datetime   | timestamp                   | Planned ending time and date for the job.             |
| external_id            | string                      | External Identifier for the job.                      |
| notes                  | string                      | Additional notes or comments about the job.           |
| tasks                  | ForeignKey (One-to-Many)    | Backreference to related tasks.                       |
| dependencies           | ForeignKey (One-to-Many)    | Backreference to related dependencies.                |
| created_at             | DateTimeField               | Timestamp when the job record was created.            |
| updated_at             | DateTimeField               | Timestamp when the job record was last updated.       |
| is_active              | BooleanField                | Indicates if the job record is active.                |
| is_deleted             | BooleanField                | Indicates if the job has been soft deleted.           |
| deleted_at             | DateTimeField (Nullable)    | Timestamp when the job was soft deleted (null if not deleted).|

---

This layout provides a clear, concise overview of the `jobs` table and its fields. You can replicate this format for other tables, ensuring consistency across your documentation.

## `job_status`

## `job_type`

## `operational-exception`

## `resource`

## `resource_group`

## `task`

## `task_status`

## `task_type`
