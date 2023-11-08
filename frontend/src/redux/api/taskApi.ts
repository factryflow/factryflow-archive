import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customeFetchBase";
import {
  CreateTask,
  Task,
  TaskStatus,
  TaskType,
  UpdateTask,
} from "@/types/api.types";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllTasks"],
  endpoints: (builder) => ({
    // getAllTask Api
    getAllTasks: builder.query<Task[], void>({
      query: () => {
        return `api/tasks/`;
      },
      transformResponse: (res: { items: Task[] }) => {
        return res.items ?? [];
      },
      providesTags: ["getAllTasks"],
    }),

    getTaskStatus: builder.query<TaskStatus[], void>({
      query: () => {
        return `api/task-status/`;
      },
      transformResponse: (res: { items: TaskStatus[] }) => {
        return res.items ?? [];
      },
    }),
    getTaskType: builder.query<TaskType[], void>({
      query: () => {
        return `api/task-types/`;
      },
      transformResponse: (res: { items: TaskType[] }) => {
        return res.items ?? [];
      },
    }),

    // gettaskbyId Api
    getTaskById: builder.mutation<null, number>({
      query: (id: number) => {
        return {
          url: `api/tasks/${id}`,
          method: "get",
        };
      },
    }),

    // create Task api
    createTasks: builder.mutation<Task, CreateTask>({
      query: (body) => {
        return {
          url: "api/tasks/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllTasks"],
    }),
    // delete Job Api
    deleteTasks: builder.mutation<null, number>({
      query: (id) => {
        return {
          url: `api/tasks/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllTasks"],
    }),
    //update job Api
    updateTasks: builder.mutation<Task, UpdateTask>({
      query: ({ id, data }) => {
        return {
          url: `api/tasks/${id}`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllTasks"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskStatusQuery,
  useGetTaskTypeQuery,
  useCreateTasksMutation,
  useDeleteTasksMutation,
  useUpdateTasksMutation,
  useGetTaskByIdMutation,
} = taskApi;

export default taskApi;
