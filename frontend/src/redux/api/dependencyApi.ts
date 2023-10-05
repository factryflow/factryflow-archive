import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllJobType } from "../types/jobs.types";
import config from "@/config/default";

export const dependencyApi = createApi({
  reducerPath: "dependencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllDependencys"],
  endpoints: (builder) => ({
    // getAllDependency Api
    getAllDependencys: builder.query<any[], void>({
      query: () => {
        return `api/dependency/`;
      },
      transformResponse: (res: { data: any[] }) => {
        const data = res.data;
        const result = data.filter((item: any) => item.is_deleted === false);
        return result;
      },
      providesTags: ["getAllDependencys"],
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

    // create Dependency Api
    createDependency: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/dependency/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllDependencys"],
    }),
    // delete Dependency Api
    deleteDependency: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/dependency/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllDependencys"],
    }),
    //update Dependency Api
    updateDependency: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/dependency/${id}/`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllDependencys"],
    }),
  }),
});

export const {
  useGetAllDependencysQuery,
  useCreateDependencyMutation,
  useDeleteDependencyMutation,
  useUpdateDependencyMutation,
  // useUpdateTasksMutation,
  // useDeleteJobsMutation,
  // useGetJobByIdMutation,
  // useUpdateJobsMutation
} = dependencyApi;
export default dependencyApi;
