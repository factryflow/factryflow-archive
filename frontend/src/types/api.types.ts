//#region common types
export type GenericResponse<T> = {
  code: number;
  message: string;
  data?: T;
};

export type Params = {
  id: string;
};
//#endregion

//#region login api types
export type Login = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string | null;
  is_active: boolean;
  is_deleted: boolean;
  token: string;
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
  priority: Nullable<number>;
  due_date: Nullable<string>;
  customer: Nullable<string>;
  description: Nullable<string>;
  note: Nullable<string>;
  planned_start: Nullable<string>;
  planned_end: Nullable<string>;
  is_active: boolean;
  is_deleted: boolean;
};

export type CreateJob = {
  name: string;
  priority: Nullable<number>;
  due_date: Nullable<Date>;
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
