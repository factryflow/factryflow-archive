import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { logout } from "@/redux/features/authSlice";
import config from "@/config/default";

const baseUrl = config.API_ENDPOINT;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (header) => {
    if (localStorage.getItem("token")) {
      const { access, refresh } = JSON.parse(
        localStorage.getItem("token") as string
      );
      console.log(access, "access");
      header.set("Authorization", `Bearer ${access}`);
    }
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if ((result.error?.data as any)?.code === "token_not_valid") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      let token;

      if (localStorage.getItem("token")) {
        const { refresh } = JSON.parse(localStorage.getItem("token") as string);

        token = refresh;

        console.log(refresh, "refresh");
      }

      try {
        const refreshResult = await baseQuery(
          {
            // credentials: "include",
            url: "api/token/refresh",
            // headers: {
            //   authorization: refresh,
            // },
            method: "POST",
            body: {
              refresh: token,
            },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Retry the initial query

          // reinitialize tokens
          localStorage.setItem(
            "token",
            JSON.stringify({
              access: (refreshResult.data as unknown as any)?.access,
              refresh: (refreshResult.data as unknown as any)?.refresh,
            })
          );

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = "/";
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
