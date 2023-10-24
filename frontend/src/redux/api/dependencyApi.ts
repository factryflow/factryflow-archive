import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customeFetchBase";
import {
  DependencyResponse,
  DependencyStatusResponse,
  GenericResponse,
} from "@/types/api.types";
export const dependencyApi = createApi({
  reducerPath: "dependencyApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllDependencys"],
  endpoints: (builder) => ({
    // getAllDependency Api
    getAllDependency: builder.query<DependencyResponse[], void>({
      query: () => {
        return `api/dependencies/`;
      },
      transformResponse: (res: GenericResponse<DependencyResponse[]>) => {
        const result = res.items;
        return result ?? [];
      },
      providesTags: ["getAllDependencys"],
    }),

    // create Dependency Api
    createDependency: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/dependencies/",
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
          url: `api/dependencies/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllDependencys"],
    }),
    //update Dependency Api
    updateDependency: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/dependencies/${id}`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllDependencys"],
    }),

    //getAll dependency Status
    getAllDependecyStatus: builder.query({
      query: () => {
        return `api/dependency-status/`;
      },
      transformResponse: (res: GenericResponse<DependencyStatusResponse[]>) => {
        const result = res.items?.filter(
          (item: any) => item.is_deleted === false
        );
        return result ?? [];
      },
    }),
  }),
});

export const {
  useGetAllDependencyQuery,
  useCreateDependencyMutation,
  useDeleteDependencyMutation,
  useUpdateDependencyMutation,
  useGetAllDependecyStatusQuery,
  // useUpdateTasksMutation,
  // useDeleteJobsMutation,
  // useGetJobByIdMutation,
  // useUpdateJobsMutation
} = dependencyApi;
export default dependencyApi;
