import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
export const dependencytypeApi = createApi({
  reducerPath: "dependencytypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllDependencyType"],
  endpoints: (builder) => ({
    //get All depency type Api
    getAllDependencyType: builder.query<any[], void>({
      query: () => {
        return `api/dependency-types/`;
      },
      transformResponse: (res: { data: any[] }) => {
        const data = res.data;
        const result = data;
        return result;
      },
      providesTags: ["getAllDependencyType"],
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

    // create depency type Api
    createDependencytype: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/dependency-types/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllDependencyType"],
    }),
    // delete depency type Api
    deleteDependencytype: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/dependency-types/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllDependencyType"],
    }),
    //update depency type Api
    updateDependencyType: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/dependency-types/${id}/`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllDependencyType"],
    }),
  }),
});

export const {
  useGetAllDependencyTypeQuery,
  useDeleteDependencytypeMutation,
  useCreateDependencytypeMutation,
  useUpdateDependencyTypeMutation,
  // useDeleteJobsMutation,
  // useGetJobByIdMutation,
  // useUpdateJobsMutation
} = dependencytypeApi;

export default dependencytypeApi;
