import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
import customFetchBase from "./customeFetchBase";
export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
  baseQuery: customFetchBase,

  tagTypes: ["getAllResources", "getResources"],
  endpoints: (builder) => ({
    // getAllResource Api
    getAllResources: builder.query<any[], void>({
      query: () => {
        return `api/resources/`;
      },

      transformResponse: (res: { items: any[] }) => {
        const result = res.items;
        return result;
      },
      providesTags: ["getAllResources"],
    }),
    //getresourceByid api
    getResourcesById: builder.query<any, number>({
      query: (id) => {
        return `api/resources/${id}`;
      },
      providesTags: ["getResources"],
    }),

    // create Resource Api
    createresources: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/resources/",
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
          url: `api/resources/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllResources"],
    }),
    //update Resource Api
    updateResources: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/resources/${id}`,
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
  useGetResourcesByIdQuery,
  useCreateresourcesMutation,
  useDeleteResourcesMutation,
  useUpdateResourcesMutation,
} = resourcesApi;

export default resourcesApi;
