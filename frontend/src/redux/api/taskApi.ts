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
        const result = res.items?.filter(
          (item: any) => item.is_deleted === false
        );
        return result ?? [];
      },
      providesTags: ["getAllTasks"],
    }),

    //   getJobbyId Api
    //   getJobById:builder.mutation({
    //     query:(id:number)=>{
    //         return{
    //             url:`api/jobs/get-job-details/${id}/`,

    //         }
    //     },
    //     transformResponse: (res: any) => res.data
    // }),

    // create Task api
    createTasks: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/tasks/",
          method: "post",
          body,
        };
      },
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
  useCreateTasksMutation,
  useDeleteTasksMutation,
  useUpdateTasksMutation,
  // useDeleteJobsMutation,
  // useGetJobByIdMutation,
  // useUpdateJobsMutation
} = taskApi;

export default taskApi;
