// redux/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import loaderReducer from "./slices/loaderSlice";
import userReducer from "./slices/userSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./Reducer/auth";
import { userApi } from "./Reducer/users";
import { fileApi } from "./Reducer/file";
import { businessApi } from "./Reducer/business";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [businessApi.reducerPath]: businessApi.reducer,
  user: userReducer,
  loader: loaderReducer,
});


const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(fileApi.middleware).concat(businessApi.middleware),
});

// Initialize Redux Persist to persist store state
export const persistor = persistStore(store);

// Infer types for use across the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Setup listeners for RTK Query
setupListeners(store.dispatch);
