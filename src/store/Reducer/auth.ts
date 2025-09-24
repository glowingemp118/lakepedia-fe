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
    adminLogin: builder.mutation({
      query: (login) => ({
        url: `admin/auth/login`,
        method: "POST",
        body: login,
      }),
    }),
    register: builder.mutation({
      query: (register) => ({
        url: `auth/register`,
        method: "POST",
        body: register,
      }),
    }),
    googleLogin: builder.mutation({
      query: (login) => ({
        url: `auth/social/google`,
        method: "POST",
        body: login,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (otpData) => ({
        url: `auth/verify_email`,
        method: "PUT",
        body: otpData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `auth/forgot_password`,
        method: "PUT",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `auth/reset_password`,
        method: "PUT",
        body: data,
      }),
    }),
    socailLogin: builder.mutation({
      query: (data) => ({
        url: `auth/social`,
        method: "POST",
        body: data,
      }),
    }),
  }),

});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useVerifyOTPMutation,
  useAdminLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSocailLoginMutation,
} = authApi;
