//#region common types
export type GenericResponse<T> = {
  code: number;
  message: string;
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
  first_name: string;
  last_name: string;
  email: string;
  password: string;
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

//#region job api types
export type JobError = {
  name: Array<string>;
};

export type JobResponse = {
  id: number;
  name: string;
  priority: number;
  due_date: string;
  customer: string;
  description: string;
  note: string;
  planned_start_datetime: string;
  planned_end_datetime: string;
  is_active: boolean;
  is_deleted: boolean;
  external_id: string;
  job_status: any;
  job_type: any;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  deleted_at: string;
};

// id": 0,
//       "name": "string",
//       "description": "string",
//       "customer": "string",
//       "due_date": "2023-10-06",
//       "priority": 0,
//       "planned_start_datetime": "2023-10-06T11:31:13.137Z",
//       "planned_end_datetime": "2023-10-06T11:31:13.137Z",
//       "external_id": "string",
//       "note": "string",
//       "job_status": 0,
//       "job_type": 0,
//       "created_at": "2023-10-06T11:31:13.138Z",
//       "created_by": 0,
//       "updated_at": "2023-10-06T11:31:13.138Z",
//       "updated_by": 0,
//       "deleted_at": "2023-10-06T11:31:13.138Z",
//       "is_active": true,
//       "is_deleted": false

export type CreateJob = {
  name: string;
  priority: Nullable<number>;
  due_date: Nullable<string>;
  customer: Nullable<string>;
  description: string;
  note: string;
  planned_start: string;
  planned_end: string;
};

export type UpdateJob = {
  // id: Pick<JobResponse, "id">;
  id: string;
  data: Partial<CreateJob>;
};
//#endregion

export type DependencyResponse = {
  id: number;
  external_id: Nullable<string>;
  name: string;
  dependency_type: number;
  dependency_status: number;
  expected_close_datetime: Nullable<string>;
  actual_close_datetime: Nullable<string>;
  notes: Nullable<string>;
  created_at: Nullable<string>;
  created_by: number;
  updated_at: Nullable<string>;
  updated_by: number;
  deleted_at: Nullable<string>;
  is_active: boolean;
  is_deleted: boolean;
};

export type DependencyStatusResponse = {
  id: number;
  name: string;
  created_at: Nullable<string>;
  created_by: number;
  updated_at: Nullable<string>;
  updated_by: number;
  deleted_at: Nullable<string>;
  is_active: boolean;
  is_deleted: boolean;
};
