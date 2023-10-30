import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
import customFetchBase from "./customeFetchBase";
export const resourcesGroupApi = createApi({
  reducerPath: "resourcesGroupApi",
  baseQuery: customFetchBase,
  tagTypes: ["getAllResourcesGroup", "getResourcegroupbyid"],
  endpoints: (builder) => ({
    // getAllResource Group Api
    getAllResourcesGroup: builder.query<any[], void>({
      query: () => {
        return `api/resource-groups/`;
      },
      transformResponse: (res: { items: any[] }) => {
        const result = res.items;
        return result ?? [];
      },
      providesTags: ["getAllResourcesGroup"],
    }),

    //getresourcegroup by id
    getresourceGroupById: builder.query<any, number>({
      query: (id) => {
        return `api/resource-groups/${id}`;
      },
      providesTags: ["getResourcegroupbyid"],
    }),

    // create Resource Group Api
    createresourcesGroup: builder.mutation({
      query: (body: any) => {
        return {
          url: "api/resource-groups/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["getAllResourcesGroup"],
    }),
    // delete Resource Group Api
    deleteResourcesGroup: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/resource-groups/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllResourcesGroup"],
    }),
    //update Resource Group Api
    updateResourcesGroup: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/resource-groups/${id}`,
          method: "put",
          body: data,
        };
      },
      invalidatesTags: ["getAllResourcesGroup"],
    }),
  }),
});

export const {
  useGetAllResourcesGroupQuery,
  useGetresourceGroupByIdQuery,
  useCreateresourcesGroupMutation,
  useDeleteResourcesGroupMutation,
  useUpdateResourcesGroupMutation,
} = resourcesGroupApi;

export default resourcesGroupApi;
