import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllJobType } from "../types/jobs.types";
import { REHYDRATE } from "redux-persist";
import config from "@/config/default";
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    // baseUrl:" http://127.0.0.1:8000/"
    baseUrl: config.API_ENDPOINT,
    // extractRehydrationInfo(action, { reducerPath }) {
    //     if (action.type === REHYDRATE) {
    //       return action.payload[reducerPath]
    //     }
    //   },
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllJobs"],
  endpoints: (builder) => ({
    // getAllJobs Api
    getAllJobs: builder.query<GetAllJobType[], void>({
      query: () => {
        return `/api/jobs/jobs-list/`;
      },
      transformResponse: (res: { data: GetAllJobType[] }) => {
        const data = res.data;
        const result = data.filter((item: any) => item.is_deleted === false);
        return result;
      },
      providesTags: ["getAllJobs"],
    }),

    //   getJobbyId Api
    getJobById: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/jobs/get-job-details/${id}/`,
        };
      },
      transformResponse: (res: any) => res.data,
    }),
    // create job api
    createJobs: builder.mutation({
      query: (body: any) => {
        return {
          url: "/api/jobs/create-job/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllJobs"],
    }),
    // delete Job Api
    deleteJobs: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/jobs/delete-job/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllJobs"],
    }),
    //update job Api
    updateJobs: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/jobs/update-jobs/${id}/`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllJobs"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useCreateJobsMutation,
  useDeleteJobsMutation,
  useGetJobByIdMutation,
  useUpdateJobsMutation,
} = jobApi;

export default jobApi;
