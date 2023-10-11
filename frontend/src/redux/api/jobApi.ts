import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { REHYDRATE } from "redux-persist";
import config from "@/config/default";
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

    //getJobStatus
    getJobStatus: builder.query<any, void>({
      query: () => {
        return `api/job-status/`;
      },
      transformResponse: (res: any) => {
        const result = res.items?.filter(
          (item: any) => item.is_deleted === false
        );
        return result ?? [];
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

    //   getJobbyId Api
    getJobById: builder.mutation<JobResponse | undefined, number>({
      query: (id: number) => {
        return {
          url: `api/jobs/${id}/`,
        };
      },
      transformResponse: (res: GenericResponse<JobResponse>) => res.items,
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
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobStatusQuery,
  useGetJobTypeQuery,
  useCreateJobsMutation,
  useDeleteJobsMutation,
  useGetJobByIdMutation,
  useUpdateJobsMutation,
} = jobApi;

export default jobApi;
