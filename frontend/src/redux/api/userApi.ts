import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "./customeFetchBase";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<any, null>({
      query() {
        return {
          url: "/api/users/me/",
        };
      },
      transformResponse: (result: any) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});
