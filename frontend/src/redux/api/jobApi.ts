import { createApi } from "@reduxjs/toolkit/query/react";

import {
  JobResponse,
  JobError,
  CreateJob,
  UpdateJob,
  GenericResponse,
} from "@/types/api.types";
import customFetchBase from "./customeFetchBase";
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllJobs"],
  endpoints: (builder) => ({
    // getAllJobs Api
    getAllJobs: builder.query<JobResponse[], void>({
      query: () => {
        return `api/jobs/`;
      },
      transformResponse: (res: GenericResponse<JobResponse[]>) => {
        const result = res.items?.filter(
          (item: any) => item.is_deleted === false
        );
        return result ?? [];
      },
      providesTags: ["getAllJobs"],
    }),

    //   getJobbyId Api
    getJobById: builder.mutation<any | undefined, number>({
      query: (id: number) => {
        return {
          url: `api/jobs/${id}`,
        };
      },
    }),
    // create job api
    createJobs: builder.mutation<
      GenericResponse<JobResponse | JobError>,
      Partial<CreateJob>
    >({
      query: (body: any) => {
        return {
          url: "api/jobs/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllJobs"],
    }),
    // delete Job Api
    deleteJobs: builder.mutation<GenericResponse<null>, number>({
      query: (id) => {
        return {
          url: `api/jobs/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllJobs"],
    }),
    //update job Api
    updateJobs: builder.mutation<
      GenericResponse<JobResponse | JobError>,
      UpdateJob
    >({
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
    getJobStatus: builder.query<any, void>({
      query: () => {
        return `api/job-status/`;
      },
      transformResponse: (res: any) => {
        const { items } = res;
        return items ?? [];
      },
    }),

    //getJobType
    getJobType: builder.query<any, void>({
      query: () => {
        return `api/job-types/`;
      },
      transformResponse: (res: any) => {
        const result = res.items;
        return result ?? [];
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
