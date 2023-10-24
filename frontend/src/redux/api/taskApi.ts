import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customeFetchBase";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllTasks"],
  endpoints: (builder) => ({
    // getAllTask Api
    getAllTasks: builder.query<any[], void>({
      query: () => {
        return `api/tasks/`;
      },
      transformResponse: (res: { items: any[] }) => {
        const result = res.items;
        return result ?? [];
      },
      providesTags: ["getAllTasks"],
    }),

    getTaskStatus: builder.query<any[], void>({
      query: () => {
        return `api/task-status/`;
      },
      transformResponse: (res: { items: any[] }) => {
        const result = res.items;
        return result ?? [];
      },
    }),
    getTaskType: builder.query<any[], void>({
      query: () => {
        return `api/task-types/`;
      },
      transformResponse: (res: { items: any[] }) => {
        const result = res.items;
        return result ?? [];
      },
    }),

    // gettaskbyId Api
    getTaskById: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/tasks/${id}`,
          method: "get",
        };
      },
    }),

    // create Task api
    createTasks: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/tasks/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllTasks"],
    }),
    // delete Job Api
    deleteTasks: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/tasks/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllTasks"],
    }),
    //update job Api
    updateTasks: builder.mutation({
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
