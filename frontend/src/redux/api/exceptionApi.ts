import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
import customFetchBase from "./customeFetchBase";
export const exceptionApi = createApi({
  reducerPath: "exceptionApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllException", "getExceptionById"],
  endpoints: (builder) => ({
    // getAllException Api
    getAllException: builder.query<any[], void>({
      query: () => {
        return `api/operational-exceptions/`;
      },
      transformResponse: (res: { items: any[] }) => {
        const result = res.items;
        return result ?? [];
      },
      providesTags: ["getAllException"],
    }),

    getExceptionById: builder.query<any[], number>({
      query: (id) => {
        return `api/operational-exceptions/${id}`;
      },
      providesTags: ["getExceptionById"],
    }),

    // create Exception Api
    createException: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/operational-exceptions/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllException"],
    }),
    // delete Exception Api
    deleteException: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/operational-exceptions/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllException"],
    }),
    //update Exception Api
    updateException: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/operational-exceptions/${id}`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllException"],
    }),
  }),
});

export const {
  useGetAllExceptionQuery,
  useGetExceptionByIdQuery,
  useCreateExceptionMutation,
  useDeleteExceptionMutation,
  useUpdateExceptionMutation,
} = exceptionApi;

export default exceptionApi;
