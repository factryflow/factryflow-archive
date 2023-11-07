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

interface TaskStatus {
  id: number;
  name: string;
}

interface TaskType {
  id: number;
  name: string;
}

interface WorkCenter {
  id: number;
  name: string;
}

interface Task {
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
}

interface DependencyType {
  id: number;
  name: string;
}

interface DependencyStatus {
  id: number;
  name: string;
}

interface Dependency {
  id: number;
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
  job_ids: number[];
  task_ids: number[];
}

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

// export type JobResponse = {
//   id: number;
//   name: string;
//   description: string;
//   customer: string;
//   due_date: string;
//   priority: number;
//   planned_start_datetime: string;
//   planned_end_datetime: string;
//   external_id: string;
//   note: string;
//   job_status: any;
//   job_type: any;
//   created_at: string;
//   created_by: number;
//   updated_at: string;
//   updated_by: number;
//   deleted_at: string;
//   task_ids: any;
//   dependencies: any;
// };

// // id": 0,
// //       "name": "string",
// //       "description": "string",
// //       "customer": "string",
// //       "due_date": "2023-10-06",
// //       "priority": 0,
// //       "planned_start_datetime": "2023-10-06T11:31:13.137Z",
// //       "planned_end_datetime": "2023-10-06T11:31:13.137Z",
// //       "external_id": "string",
// //       "note": "string",
// //       "job_status": 0,
// //       "job_type": 0,
// //       "created_at": "2023-10-06T11:31:13.138Z",
// //       "created_by": 0,
// //       "updated_at": "2023-10-06T11:31:13.138Z",
// //       "updated_by": 0,
// //       "deleted_at": "2023-10-06T11:31:13.138Z",
// //       "is_active": true,
// //       "is_deleted": false

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
  // id: Pick<JobResponse, "id">;
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
// //#endregion

// export type DependencyResponse = {
//   id: number;
//   external_id: Nullable<string>;
//   name: string;
//   dependency_type: number;
//   dependency_status: number;
//   expected_close_datetime: Nullable<string>;
//   actual_close_datetime: Nullable<string>;
//   notes: Nullable<string>;
//   created_at: Nullable<string>;
//   created_by: number;
//   updated_at: Nullable<string>;
//   updated_by: number;
//   deleted_at: Nullable<string>;
//   is_active: boolean;
//   is_deleted: boolean;
// };

// export type DependencyStatusResponse = {
//   id: number;
//   name: string;
//   created_at: Nullable<string>;
//   created_by: any;
//   updated_at: Nullable<string>;
//   updated_by: any;
// };
