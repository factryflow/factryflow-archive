import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllJobType } from "../types/jobs.types";
import config from "@/config/default";
export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllTasks"],
  endpoints: (builder) => ({
    // getAllTask Api
    getAllTasks: builder.query<any[], void>({
      query: () => {
        return `api/tasks/tasks-list/`;
      },
      transformResponse: (res: { data: any[] }) => {
        const data = res.data;
        const result = data.filter((item: any) => item.is_deleted === false);
        return result;
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
          url: "api/tasks/create-task/",
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
          url: `api/tasks/delete-task/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllTasks"],
    }),
    //update job Api
    updateTasks: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/tasks/update-tasks/${id}/`,
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
