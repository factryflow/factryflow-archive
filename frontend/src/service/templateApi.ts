import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllTemplate"],
  endpoints: (builder) => ({
    // getAllTemplate Api
    getAllTemplate: builder.query<any[] | undefined, void>({
      query: () => {
        return `api/weekly-shift-template/`;
      },
      transformResponse: (res: { data: any[] }) => {
        const data = res.data;
        const result = data.filter((item: any) => item.is_deleted === false);
        return result;
      },
      providesTags: ["getAllTemplate"],
    }),

    // create Template Api
    createTemplate: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/weekly-shift-template/",
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
          url: `api/weekly-shift-template/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllTemplate"],
    }),
    //update Template Api
    updateTemplate: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/weekly-shift-template/${id}/`,
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
