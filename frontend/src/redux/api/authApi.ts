import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default";

import {
  Login,
  Register,
  LoginResponse,
  RegisterResponse,
  GenericResponse,
} from "@/types/api.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<GenericResponse<LoginResponse>, Login>({
      query: (body) => {
        return {
          url: "api/auth-login/",
          method: "post",
          body,
        };
      },
    }),
    registerUser: builder.mutation<GenericResponse<RegisterResponse>, Register>(
      {
        query: (body: {
          first_name: string;
          last_name: string;
          email: string;
          password: string;
        }) => {
          return {
            url: "api/auth-sign-up/",
            method: "post",
            body,
          };
        },
      }
    ),
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: "api/change-password/",
          method: "put",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    getProfile: builder.query({
      query: () => {
        return {
          url: `api/user-details/`,
          method: "get",
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
  useGetProfileQuery,
} = authApi;
export default authApi;
