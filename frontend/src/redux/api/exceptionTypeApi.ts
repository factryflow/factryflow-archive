import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
export const exceptionTypeApi = createApi({
  reducerPath: "exceptionTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllExceptionType"],
  endpoints: (builder) => ({
    // getAllExceptionType Api
    getAllExceptionType: builder.query<any[], void>({
      query: () => {
        return `api/operational-exception-types/`;
      },
      transformResponse: (res: { data: any[] }) => {
        const data = res.data;
        const result = data.filter((item: any) => item.is_deleted === false);
        return result;
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
