import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/api/auth/login/",
          method: "post",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
      }) => {
        return {
          url: "/api/auth/sign-up/",
          method: "post",
          body,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: "api/user/change-password/",
          method: "put",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useChangePasswordMutation,
} = authApi;
export default authApi;
