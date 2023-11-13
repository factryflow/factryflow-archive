import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customeFetchBase";
import {
  CreateDependency,
  Dependency,
  DependencyStatus,
  GenericResponse,
  UpdateDependency,
} from "@/types/api.types";
export const dependencyApi = createApi({
  reducerPath: "dependencyApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllDependencys"],
  endpoints: (builder) => ({
    // getAllDependency Api
    getAllDependency: builder.query<Dependency[], void>({
      query: () => {
        return `api/dependencies/`;
      },
      transformResponse: (res: { items: Dependency[] }) => {
        return res.items ?? [];
      },
      providesTags: ["getAllDependencys"],
    }),

    getDependencyById: builder.mutation<Dependency | undefined, number>({
      query: (id: number) => {
        return {
          url: `api/dependencies/${id}`,
        };
      },
    }),

    // create Dependency Api
    createDependency: builder.mutation<Dependency, Partial<CreateDependency>>({
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
    deleteDependency: builder.mutation<null, number>({
      query: (id: number) => {
        return {
          url: `api/dependencies/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllDependencys"],
    }),
    //update Dependency Api
    updateDependency: builder.mutation<Dependency, UpdateDependency>({
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
    getAllDependecyStatus: builder.query<DependencyStatus[], void>({
      query: () => {
        return `api/dependency-status/`;
      },
      transformResponse: (res: { items: DependencyStatus[] }) => {
        return res.items ?? [];
      },
    }),
  }),
});

export const {
  useGetAllDependencyQuery,
  useGetDependencyByIdMutation,
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
