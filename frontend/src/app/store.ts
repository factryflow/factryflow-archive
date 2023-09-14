import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore, REHYDRATE, FLUSH, PERSIST, PURGE, PAUSE } from "redux-persist"
import storage from "redux-persist/lib/storage"


import { authApi } from "../service/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "../features/authSlice";
import jobReducer from "../features/jobSlice";
import taskReducer from "../features/taskSlice";
import dependencyReducer from "../features/dependencySlice";
import dependencytypeReducer from "../features/dependencytypeSlice"
import resourceReducer from "../features/resourceSlice";
import resourceGroupReducer from "../features/resourceGroupSlice";
import exceptionReducer from "../features/exceptionSlice";
import exceptionTypeReducer from "../features/exceptiontypeSlice";

import { jobApi } from "../service/jobApi";
import { taskApi } from "../service/taskApi";
import { dependencyApi } from "../service/dependencyApi";
import { dependencytypeApi } from "../service/dependencytypeApi";
import { resourcesApi } from "../service/resourceApi";
import { resourcesGroupApi } from "../service/resourcegroupApi";
import { exceptionApi } from "../service/exceptionApi";
import { exceptionTypeApi } from "../service/exceptionTypeApi";
const reducer = combineReducers({
  auth:authReducer,
  job:jobReducer,
  task:taskReducer,
  dependency:dependencyReducer,
  dependencytype:dependencytypeReducer,
  resource:resourceReducer,
  resourceGroup:resourceGroupReducer,
  exception:exceptionReducer,
  exceptiontype:exceptionTypeReducer,
 [authApi.reducerPath]: authApi.reducer,
 [jobApi.reducerPath]: jobApi.reducer,
 [taskApi.reducerPath]:taskApi.reducer,
 [dependencyApi.reducerPath]:dependencyApi.reducer,
 [dependencytypeApi.reducerPath]:dependencytypeApi.reducer,
 [resourcesApi.reducerPath]:resourcesApi.reducer,
 [resourcesGroupApi.reducerPath]:resourcesGroupApi.reducer,
 [exceptionApi.reducerPath]:exceptionApi.reducer,
 [exceptionTypeApi.reducerPath]:exceptionTypeApi.reducer,

 })

 type RootReducer = ReturnType<typeof reducer>

 const config : PersistConfig<any> = {
  key: "root",
  storage,
  blacklist: [jobApi.reducerPath,taskApi.reducerPath,dependencyApi.reducerPath,dependencytypeApi.reducerPath,resourcesApi.reducerPath,resourcesGroupApi.reducerPath,exceptionApi.reducerPath,exceptionTypeApi.reducerPath],
  whitelist: ["job","dependency","task","resource","resourceGroup"]
}

const peristedReducer = persistReducer<RootReducer, AnyAction>(config, reducer)

export const store = configureStore({
    reducer: peristedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: false
        }).concat(authApi.middleware).concat(jobApi.middleware).concat(taskApi.middleware).concat(dependencyApi.middleware).concat(dependencytypeApi.middleware).concat(resourcesApi.middleware).concat(resourcesGroupApi.middleware).concat(exceptionApi.middleware).concat(exceptionTypeApi.middleware);
      },
})



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch)

export const persistor = persistStore(store)