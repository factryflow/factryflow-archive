import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customeFetchBase";
import { userApi } from "./userApi";
import {
  Login,
  Register,
  LoginResponse,
  RegisterResponse,
  GenericResponse,
} from "@/types/api.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<GenericResponse<LoginResponse>, Login>({
      query: (body) => {
        return {
          url: "api/token/pair",
          method: "post",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    registerUser: builder.mutation<GenericResponse<RegisterResponse>, Register>(
      {
        query: (body) => {
          return {
            url: "api/users/",
            method: "post",
            body,
          };
        },
      }
    ),
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: "api/users/change-password/",
          method: "put",
          body,
        };
      },
    }),
    getProfile: builder.query({
      query: () => {
        return {
          url: `api/user-details/`,
          method: "get",
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
