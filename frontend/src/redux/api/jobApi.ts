import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllJobType } from "../types/jobs.types";
import { REHYDRATE } from "redux-persist";
import config from "@/config/default";
import {
  JobResponse,
  JobError,
  CreateJob,
  UpdateJob,
  GenericResponse,
} from "@/types/api.types";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllJobs"],
  endpoints: (builder) => ({
    // getAllJobs Api
    getAllJobs: builder.query<JobResponse[], void>({
      query: () => {
        return `api/jobs/`;
      },
      transformResponse: (res: GenericResponse<JobResponse[]>) => {
        const result = res.data?.filter(
          (item: any) => item.is_deleted === false
        );
        return result ?? [];
      },
      providesTags: ["getAllJobs"],
    }),

    //   getJobbyId Api
    getJobById: builder.mutation<JobResponse | undefined, number>({
      query: (id: number) => {
        return {
          url: `aapi/jobs/${id}/`,
        };
      },
      transformResponse: (res: GenericResponse<JobResponse>) => res.data,
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
          url: `api/jobs/${id}/`,
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
          url: `api/jobs/${id}/`,
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
