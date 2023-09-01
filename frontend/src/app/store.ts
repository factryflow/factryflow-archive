import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "../features/authSlice";
import { jobApi } from "../service/jobApi";
export const store = configureStore({
    reducer:{
     auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware).concat(jobApi.middleware);
      },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch)