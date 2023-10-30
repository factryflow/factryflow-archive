import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
import customFetchBase from "./customeFetchBase";
export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllTemplate"],
  endpoints: (builder) => ({
    // getAllTemplate Api
    getAllTemplate: builder.query<any[] | undefined, void>({
      query: () => {
        return `api/weekly-shift-templates/`;
      },
      transformResponse: (res: { items: any[] }) => {
        const result = res.items;
        return result ?? [];
      },
      providesTags: ["getAllTemplate"],
    }),

    // create Template Api
    createTemplate: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/weekly-shift-templates/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllTemplate"],
    }),
    // delete Template Api
    deleteTemplate: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/weekly-shift-templates/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllTemplate"],
    }),
    //update Template Api
    updateTemplate: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/weekly-shift-templates/${id}/`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllTemplate"],
    }),
  }),
});

export const {
  useGetAllTemplateQuery,
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} = templateApi;

export default templateApi;
