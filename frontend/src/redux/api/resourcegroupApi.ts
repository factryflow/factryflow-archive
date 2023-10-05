import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
export const resourcesGroupApi = createApi({
  reducerPath: "resourcesGroupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["getAllResourcesGroup"],
  endpoints: (builder) => ({
    // getAllResource Group Api
    getAllResourcesGroup: builder.query<any[], void>({
      query: () => {
        return `api/resource-groups/`;
      },
      transformResponse: (res: { data: any[] }) => {
        const data = res.data;
        const result = data.filter((item: any) => item.is_deleted === false);
        return result;
      },
      providesTags: ["getAllResourcesGroup"],
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
          url: `api/resource-groups/${id}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["getAllResourcesGroup"],
    }),
    //update Resource Group Api
    updateResourcesGroup: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `api/resource-groups/${id}/`,
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
  useCreateresourcesGroupMutation,
  useDeleteResourcesGroupMutation,
  useUpdateResourcesGroupMutation,
} = resourcesGroupApi;

export default resourcesGroupApi;
