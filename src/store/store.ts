// redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/loaderSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./Reducer/auth";
import { userApi } from "./Reducer/users";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer, // Reducer for RTK Query API
  [userApi.reducerPath]: userApi.reducer, // Reducer for RTK Query API
  user: userReducer,                     // Slice for user state
  loader: loaderReducer,                 // Slice for loader state
});

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the `user` slice
};

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
      .concat(userApi.middleware),
});

// Initialize Redux Persist to persist store state
export const persistor = persistStore(store);

// Infer types for use across the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Setup listeners for RTK Query
setupListeners(store.dispatch);
