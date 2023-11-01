import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
import customFetchBase from "./customeFetchBase";
export const exceptionTypeApi = createApi({
  reducerPath: "exceptionTypeApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllExceptionType"],
  endpoints: (builder) => ({
    // getAllExceptionType Api
    getAllExceptionType: builder.query<any[], void>({
      query: () => {
        return `api/operational-exception-types/`;
      },
      transformResponse: (res: { items: any[] }) => {
        const result = res.items;
        return result ?? [];
      },
      providesTags: ["getAllExceptionType"],
    }),

    // create Exception Api
    createExceptionType: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/operational-exception-types/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllExceptionType"],
    }),
    // delete Exception Api
    deleteExceptionType: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/operational-exception-types/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllExceptionType"],
    }),
    //update Exception Api
    updateExceptionType: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/operational-exception-types/${id}/`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllExceptionType"],
    }),
  }),
});

export const {
  useGetAllExceptionTypeQuery,
  useCreateExceptionTypeMutation,
  useDeleteExceptionTypeMutation,
  useUpdateExceptionTypeMutation,
} = exceptionTypeApi;

export default exceptionTypeApi;
