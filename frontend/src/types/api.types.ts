//#region common types
export type GenericResponse<T> = {
  items?: T;
};

export type Params = {
  id: string;
};
//#endregion

//#region login api types
export type Login = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
  username: string;
} | null;
//#endregion

//#region register api types
export type Register = {
  username: string;
  email: string;
  password: string;
  role_id?: number;
};

export type RegisterResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string | null;
  is_active: boolean;
  is_deleted: boolean;
  token: string;
} | null;

type Nullable<T> = T | null;

//#endregion

export type TaskStatus = {
  id: number;
  name: string;
};

export type TaskType = {
  id: number;
  name: string;
};

interface WorkCenter {
  id: number;
  name: string;
}

export type Task = {
  id: number;
  external_id: string;
  name: string;
  task_status: TaskStatus;
  task_type: TaskType;
  setup_time: number;
  run_time_per_unit: number;
  teardown_time: number;
  quantity: number;
  item: string;
  planned_start_datetime: string;
  planned_end_datetime: string;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  work_center: WorkCenter;
  job: {
    id: number;
    name: string;
    priority: number;
  };
  predecessor_ids: number[];
  successor_ids: number[];
  dependency_ids: number[];
};

export type CreateTask = {
  name: string;
  external_id: string;
  setup_time: number;
  run_time_per_unit: number;
  teardown_time: number;
  quantity: number;
  task_status_id: number;
  task_type_id: number;
  job_id: number;
  work_center_id: number;
  item_id: number;
  predecessor_ids: number[];
  successor_ids: number[];
  dependency_ids: number[];
};

export type UpdateTask = {
  id: string | undefined;
  data: {
    name: string;
    external_id: string;
    setup_time: number;
    run_time_per_unit: number;
    teardown_time: number;
    quantity: number;
    task_status_id: number;
    task_type_id: number;
    job_id: number;
    work_center_id: number;
    item_id: number;
    predecessor_ids: number[];
    successor_ids: number[];
    dependency_ids: number[];
  };
};

interface DependencyType {
  id: number;
  name: string;
}

export type DependencyStatus = {
  id: number;
  name: string;
};

export type Dependency = {
  id: string | undefined;
  name: string;
  external_id: string;
  expected_close_datetime: string;
  actual_close_datetime: string;
  notes: string;
  dependency_type: DependencyType;
  dependency_status: DependencyStatus;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  job_ids?: number[];
  task_ids?: number[];
};

export type CreateDependency = {
  name: string;
  external_id: string;
  expected_close_datetime: string;
  actual_close_datetime: string;
  notes: string;
  dependency_status_id: number;
  dependency_type_id: number;
  job_ids: string[];
  task_ids: string[];
};

export type UpdateDependency = {
  id: string;
  data: {
    name: string;
    external_id: string;
    expected_close_datetime: string;
    actual_close_datetime: string;
    notes: string;
    dependency_status_id: number;
    dependency_type_id: number;
    job_ids: string[];
    task_ids: string[];
  };
};

export type Job = {
  id: number;
  description: string;
  customer: string;
  due_date: string;
  priority: number;
  planned_start_datetime: string;
  planned_end_datetime: string;
  external_id: string;
  note: string;
  job_status: {
    id: number;
    name: string;
  };
  job_type: {
    id: number;
    name: string;
  };
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  task_ids: number[];
  dependency_ids: number[];
  tasks: Task[];
  dependencies: Dependency[];
};

export type JobStatusResponse = {
  id: number;
  name: string;
};

export type JobTypeResonse = Partial<JobStatusResponse>;

//#region job api types
// export type JobError = {
//   name: Array<string>;
// };

export type CreateJob = {
  name: string;
  customer: string;
  due_date: string;
  external_id: string;
  job_status_id: number;
  job_type_id: number;
  dependency_ids: number[];
  task_ids: number[];
  priority: number;
};

export type UpdateJob = {
  id: string;
  data: {
    name: string;
    customer: string;
    due_date: string;
    external_id: string;
    job_status_id: number;
    job_type_id: number;
    dependency_ids: number[];
    task_ids: number[];
    priority: number;
  };
};
