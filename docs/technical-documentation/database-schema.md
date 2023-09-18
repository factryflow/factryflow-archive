# Database Schema

All tables will have the following metadata fields:

| data_type | field_name |
| --------- | ---------- |
| datetime  | updated_at |
| boolean   | is_active  |
| boolean   | is_deleted |
| datetime  | deleted_at |

## `assignment_rule`

**Description**: Stores the rules for assignments, including their priority and resource count.

| data_type | field_name        | constraints | default | relationships | comments |
| --------- | ----------------- | ----------- | ------- | ------------- | -------- |
| int       | id                | PK          |         |               |          |
| string    | name              | NOT NULL    | 'N/A'   |               |          |
| string    | description       |             | 'N/A'   |               |          |
| int       | priority          |             |         |               |          |
| int       | resource_count    |             | 1       |               |          |
| bool      | use_all_resources |             | false   |               |          |

## `assignment_rule_criteria`

**Description**: Defines the criteria for each assignment rule.

| data_type | field_name         | constraints | default  | relationships     | comments                  |
| --------- | ------------------ | ----------- | -------- | ----------------- | ------------------------- |
| int       | id                 | PK          |          |                   |                           |
| int       | parent_id          |             | NULL     |                   | Parent criteria ID if any |
| string    | field              | NOT NULL    | 'N/A'    |                   |                           |
| enum      | operator           |             | 'equals' |                   |                           |
| string    | value              |             | 'N/A'    |                   |                           |
| int       | assignment_rule_id | FK          |          | `assignment_rule` |                           |

## `assignment_rule_resource_group`

**Description**: Links assignment rules to resource groups.

| data_type | field_name        | constraints | default | relationships     | comments |
| --------- | ----------------- | ----------- | ------- | ----------------- | -------- |
| int       | assigment_rule_id | PK, FK      |         | `assignment_rule` |          |
| int       | resource_group_id | PK, FK      |         | `resource_group`  |          |

## `dependency`

**Description**: Manages external dependencies for tasks and jobs.

| data_type | field_name              | constraints | default | relationships       | comments                                          |
| --------- | ----------------------- | ----------- | ------- | ------------------- | ------------------------------------------------- |
| int       | id                      | PK          |         |                     |                                                   |
| string    | external_id             |             | 'N/A'   |                     | External Identifier for the dependency            |
| string    | name                    |             | 'N/A'   |                     |                                                   |
| int       | dependency_status_id    | FK          |         | `dependency_status` |                                                   |
| int       | dependency_type_id      | FK          |         | `dependency_type`   |                                                   |
| datetime  | expected_close_datetime |             |         |                     | Expected closure date/time for the dependency     |
| datetime  | actual_close_datetime   |             |         |                     | Actual closure date/time for the dependency       |
| string    | notes                   |             | 'N/A'   |                     | Additional notes or comments about the dependency |

## `dependency_status`

**Description**: Lists possible statuses for dependencies.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `dependency_type`

**Description**: Categorizes dependencies into types.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `job`

**Description**: Represents jobs in the production schedule.

| data_type | field_name             | constraints | default | relationships | comments                               |
| --------- | ---------------------- | ----------- | ------- | ------------- | -------------------------------------- |
| int       | id                     | PK          |         |               |                                        |
| string    | name                   |             | 'N/A'   |               |                                        |
| string    | description            |             | 'N/A'   |               |                                        |
| string    | customer               |             | 'N/A'   |               | Customer associated with the job       |
| date      | due_date               |             |         |               | Due date for the job completion        |
| int       | priority               |             |         |               | Priority of the job                    |
| timestamp | planned_start_datetime |             |         |               | Start datetime planned by schedule-run |
| timestamp | planned_end_datetime   |             |         |               | End datetime planned by schedule-run   |
| string    | external_id            |             | 'N/A'   |               |                                        |
| string    | notes                  |             | 'N/A'   |               |                                        |
| int       | job_status_id          | FK          |         | `job_status`  |                                        |
| int       | job_type_id            | FK          |         | `job_type`    |                                        |

## `job_dependency`

**Description**: Links jobs to their dependencies.

| data_type | field_name    | constraints | default | relationships | comments |
| --------- | ------------- | ----------- | ------- | ------------- | -------- |
| int       | job_id        | PK, FK      |         | `job`         |          |
| int       | dependency_id | PK, FK      |         | `dependency`  |          |

## `job_status`

**Description**: Lists possible statuses for jobs.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `job_type`

**Description**: Categorizes jobs into different types.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `operational_exception`

**Description**: Manages exceptions in operations.

| data_type | field_name                    | constraints | default | relationships                | comments |
| --------- | ----------------------------- | ----------- | ------- | ---------------------------- | -------- |
| int       | id                            | PK          |         |                              |          |
| string    | external_id                   |             | 'N/A'   |                              |          |
| datetime  | start_datetime                |             |         |                              |          |
| datetime  | end_datetime                  |             |         |                              |          |
| string    | notes                         |             | 'N/A'   |                              |          |
| int       | weekly_shift_template_id      | FK          |         | `weekly_shift_template`      |          |
| int       | operational_exception_type_id | FK          |         | `operational_exception_type` |          |

## `operational_exception_type`

**Description**: Categorizes operational exceptions into types.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `resource`

**Description**: Represents resources available for tasks.

| data_type | field_name               | constraints | default | relationships           | comments |
| --------- | ------------------------ | ----------- | ------- | ----------------------- | -------- |
| int       | id                       | PK          |         |                         |          |
| string    | name                     |             | 'N/A'   |                         |          |
| int       | weekly_shift_template_id | FK          |         | `weekly_shift_template` |          |

## `resource_group`

**Description**: Groups resources for better management.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `schedule_run_table`

**Description**: Logs when the scheduling algorithm was run.

| data_type | field_name         | constraints | default | relationships         | comments                           |
| --------- | ------------------ | ----------- | ------- | --------------------- | ---------------------------------- |
| int       | id                 | PK          |         |                       |                                    |
| datetime  | triggered_on       |             |         |                       | Datetime when the schedule was run |
| int       | schedule_status_id | FK          |         | `schedule_run_status` |                                    |

## `schedule_run_status`

**Description**: Lists possible statuses for schedule runs.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `task`

**Description**: Represents individual tasks in the production schedule.

| data_type | field_name             | constraints | default | relationships | comments                               |
| --------- | ---------------------- | ----------- | ------- | ------------- | -------------------------------------- |
| int       | id                     | PK          |         |               |                                        |
| string    | name                   |             | 'N/A'   |               |                                        |
| int       | task_status            | FK          |         | `task_status` |                                        |
| int       | quantity               |             | 1       |               |                                        |
| int       | setup_time             |             |         |               |                                        |
| int       | run_time_per_unit      |             |         |               |                                        |
| int       | teardown_time          |             |         |               |                                        |
| datetime  | planned_start_datetime |             |         |               | Start datetime planned by schedule-run |
| datetime  | planned_end_datetime   |             |         |               | End datetime planned by schedule-run   |
| string    | item                   |             | 'N/A'   |               | The item which is produced             |
| int       | task_status_id         | FK          |         | `task_status` |                                        |
| int       | task_type_id           | FK          |         | `task_type`   |                                        |
| int       | job_id                 | FK          |         | `job`         | The associated job, NULLABLE           |

## `task_dependency`

**Description**: Links tasks to their dependencies.

| data_type | field_name    | constraints | default | relationships | comments |
| --------- | ------------- | ----------- | ------- | ------------- | -------- |
| int       | task_id       | PK, FK      |         | `task`        |          |
| int       | dependency_id | PK, FK      |         | `dependency`  |          |

## `task_relationship`

**Description**: Defines relationships between tasks.

| data_type | field_name     | constraints | default | relationships | comments |
| --------- | -------------- | ----------- | ------- | ------------- | -------- |
| int       | predecessor_id | PK, FK      |         | `task`        |          |
| string    | successor_id   | PK, FK      |         | `task`        |          |

## `task_resource_assignment`

**Description**: Assigns resources to tasks.

| data_type | field_name  | constraints | default | relationships | comments |
| --------- | ----------- | ----------- | ------- | ------------- | -------- |
| int       | task_id     | PK, FK      |         | `task`        |          |
| string    | resource_id | PK, FK      |         | `resource`    |          |

## `task_status`

**Description**: Lists possible statuses for tasks.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `task_type`

**Description**: Categorizes tasks into different types.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `user`

**Description**: Represents users of the production scheduling software.

| data_type | field_name   | constraints | default | relationships | comments  |
| --------- | ------------ | ----------- | ------- | ------------- | --------- |
| int       | id           | PK          |         |               |           |
| string    | first_name   |             | 'N/A'   |               |           |
| string    | last_name    |             | 'N/A'   |               |           |
| string    | email        |             | 'N/A'   |               |           |
| string    | password     |             | 'N/A'   |               | Encrypted |
| int       | user_role_id | FK          |         | `user_role`   |           |

## `user_role`

**Description**: Defines roles for users.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `weekly_shift_template`

**Description**: Templates for weekly shifts.

| data_type | field_name | constraints | default | relationships | comments |
| --------- | ---------- | ----------- | ------- | ------------- | -------- |
| int       | id         | PK          |         |               |          |
| string    | name       |             | 'N/A'   |               |          |

## `weekly_shift_template_detail`

**Description**: Detailed breakdown of weekly shift templates.

| data_type | field_name               | constraints | default | relationships           | comments |
| --------- | ------------------------ | ----------- | ------- | ----------------------- | -------- |
| int       | id                       | PK          |         |                         |          |
| int       | day_of_week              |             | 0       |                         |          |
| time      | start_time               |             |         |                         |          |
| time      | end_time                 |             |         |                         |          |
| int       | weekly_shift_template_id | FK          |         | `weekly_shift_template` |          |
