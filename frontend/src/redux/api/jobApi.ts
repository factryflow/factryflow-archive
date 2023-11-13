import { createApi } from "@reduxjs/toolkit/query/react";

import {
  CreateJob,
  UpdateJob,
  GenericResponse,
  JobStatusResponse,
  JobTypeResonse,
  Job,
} from "@/types/api.types";
import customFetchBase from "./customeFetchBase";
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllJobs"],
  endpoints: (builder) => ({
    // getAllJobs Api
    getAllJobs: builder.query<Job[], void>({
      query: () => {
        return `api/jobs/`;
      },
      transformResponse: (res: { items: Job[] }) => {
        return res.items ?? [];
      },
      providesTags: ["getAllJobs"],
    }),

    //   getJobbyId Api
    getJobById: builder.mutation<Job | undefined, number>({
      query: (id: number) => {
        return {
          url: `api/jobs/${id}`,
        };
      },
    }),
    // create job api
    createJobs: builder.mutation<Job, Partial<CreateJob>>({
      query: (body) => {
        return {
          url: "api/jobs/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllJobs"],
    }),
    // delete Job Api
    deleteJobs: builder.mutation<null, number>({
      query: (id) => {
        return {
          url: `api/jobs/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllJobs"],
    }),
    //update job Api
    updateJobs: builder.mutation<Job, UpdateJob>({
      query: ({ id, data }) => {
        return {
          url: `api/jobs/${id}`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllJobs"],
    }),

    //getJobStatus
    getJobStatus: builder.query<JobStatusResponse[], void>({
      query: () => {
        return `api/job-status/`;
      },
      transformResponse: (res: { items: JobStatusResponse[] }) => {
        return res.items ?? [];
      },
    }),

    //getJobType
    getJobType: builder.query<JobTypeResonse[], void>({
      query: () => {
        return `api/job-types/`;
      },
      transformResponse: (res: { items: JobTypeResonse[] }) => {
        return res.items ?? [];
      },
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobStatusQuery,
  useGetJobByIdMutation,
  useGetJobTypeQuery,
  useCreateJobsMutation,
  useDeleteJobsMutation,
  useUpdateJobsMutation,
} = jobApi;

export default jobApi;
