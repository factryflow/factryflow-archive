import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "./customeFetchBase";
import { GenericResponse } from "@/types/api.types";
export const dependencytypeApi = createApi({
  reducerPath: "dependencytypeApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllDependencyType"],
  endpoints: (builder) => ({
    //get All depency type Api
    getAllDependencyType: builder.query<any[], void>({
      query: () => {
        return `api/dependency-types/`;
      },
      transformResponse: (res: GenericResponse<any[]>) => {
        const result = res.items?.filter(
          (item: any) => item.is_deleted === false
        );
        return result ?? [];
      },
      providesTags: ["getAllDependencyType"],
    }),

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
          url: `api/dependency-types/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllDependencyType"],
    }),
    //update depency type Api
    updateDependencyType: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/dependency-types/${id}`,
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
