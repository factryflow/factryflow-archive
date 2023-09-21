import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import {
  PersistConfig,
  persistReducer,
  persistStore,
  REHYDRATE,
  FLUSH,
  PERSIST,
  PURGE,
  PAUSE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import {
  authReducer,
  jobReducer,
  taskReducer,
  dependencyReducer,
  dependencytypeReducer,
  resourceReducer,
  resourceGroupReducer,
  exceptionReducer,
  exceptionTypeReducer,
  menureducer,
  templateReducer,
  userReducer,
  templateDetailsReducer,
} from "../features";

import {
  authApi,
  jobApi,
  taskApi,
  dependencyApi,
  dependencytypeApi,
  resourcesApi,
  resourcesGroupApi,
  exceptionApi,
  exceptionTypeApi,
  templateApi,
  templateDetailsApi,
} from "../service";

const reducer = combineReducers({
  menu: menureducer,
  auth: authReducer,
  job: jobReducer,
  task: taskReducer,
  dependency: dependencyReducer,
  dependencytype: dependencytypeReducer,
  resource: resourceReducer,
  resourceGroup: resourceGroupReducer,
  exception: exceptionReducer,
  exceptiontype: exceptionTypeReducer,
  template: templateReducer,
  user: userReducer,
  templatedetail: templateDetailsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [dependencyApi.reducerPath]: dependencyApi.reducer,
  [dependencytypeApi.reducerPath]: dependencytypeApi.reducer,
  [resourcesApi.reducerPath]: resourcesApi.reducer,
  [resourcesGroupApi.reducerPath]: resourcesGroupApi.reducer,
  [exceptionApi.reducerPath]: exceptionApi.reducer,
  [exceptionTypeApi.reducerPath]: exceptionTypeApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
  [templateDetailsApi.reducerPath]: templateDetailsApi.reducer,
});

type RootReducer = ReturnType<typeof reducer>;

const config: PersistConfig<any> = {
  key: "root",
  storage,
  blacklist: [
    jobApi.reducerPath,
    taskApi.reducerPath,
    dependencyApi.reducerPath,
    dependencytypeApi.reducerPath,
    resourcesApi.reducerPath,
    resourcesGroupApi.reducerPath,
    exceptionApi.reducerPath,
    exceptionTypeApi.reducerPath,
    templateApi.reducerPath,
    templateDetailsApi.reducerPath,
  ],
  whitelist: [
    "menu",
    "job",
    "dependency",
    "task",
    "resource",
    "resourceGroup",
    "user",
    "template",
  ],
};

const peristedReducer = persistReducer<RootReducer, AnyAction>(config, reducer);

export const store = configureStore({
  reducer: peristedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(jobApi.middleware)
      .concat(taskApi.middleware)
      .concat(dependencyApi.middleware)
      .concat(dependencytypeApi.middleware)
      .concat(resourcesApi.middleware)
      .concat(resourcesGroupApi.middleware)
      .concat(exceptionApi.middleware)
      .concat(exceptionTypeApi.middleware)
      .concat(templateApi.middleware)
      .concat(templateDetailsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);

export const persistor = persistStore(store);
