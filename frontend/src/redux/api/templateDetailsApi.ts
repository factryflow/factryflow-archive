import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
export const templateDetailsApi = createApi({
  reducerPath: "templateDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllTemplateDetails"],
  endpoints: (builder) => ({
    // getAllTemplateDetails Api
    getAllTemplateDetails: builder.query<any[] | undefined, void>({
      query: () => {
        return `api/weekly-shift-template-details/`;
      },
      transformResponse: (res: { data: any[] }) => {
        const data = res.data;
        const result = data.filter((item: any) => item.is_deleted === false);
        return result;
      },
      providesTags: ["getAllTemplateDetails"],
    }),

    // create Template Api
    createTemplateDetails: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/weekly-shift-template-details/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllTemplateDetails"],
    }),
    // delete Template Api
    deleteTemplateDetails: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/weekly-shift-template-details/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllTemplateDetails"],
    }),
    //update Template Api
    updateTemplateDetails: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/weekly-shift-template-details/${id}/`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllTemplateDetails"],
    }),
  }),
});

export const {
  useGetAllTemplateDetailsQuery,
  useCreateTemplateDetailsMutation,
  useDeleteTemplateDetailsMutation,
  useUpdateTemplateDetailsMutation,
} = templateDetailsApi;

export default templateDetailsApi;
