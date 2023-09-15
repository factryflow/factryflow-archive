import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllResources"],
  endpoints: (builder) => ({
    // getAllResource Api
    getAllResources: builder.query<any[], void>({
      query: () => {
        return `api/resource/get-resources-list/`;
      },
      transformResponse: (res: { data: any[] }) => {
        const data = res.data;
        const result = data.filter((item: any) => item.is_deleted === false);
        return result;
      },
      providesTags: ["getAllResources"],
    }),

    // create Resource Api
    createresources: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/resource/create-resources/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllResources"],
    }),
    // delete Resource Api
    deleteResources: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/resource/delete-resources/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllResources"],
    }),
    //update Resource Api
    updateResources: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/resource/update-resources/${id}/`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllResources"],
    }),
  }),
});

export const {
  useGetAllResourcesQuery,
  useCreateresourcesMutation,
  useDeleteResourcesMutation,
  useUpdateResourcesMutation,
} = resourcesApi;

export default resourcesApi;
