import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: customFetchBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (login) => ({
        url: `auth/login`,
        method: "POST",
        body: login,
      }),
    }),
    register: builder.mutation({
      query: (register) => ({
        url: `auth/register`,
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: register,
      }),
    }),
    googleLogin: builder.mutation({
      query: (login) => ({
        url: `auth/social/google`,
        method: "POST",
        body: login,
      }),
    })
  }),
  
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation
} = authApi;
