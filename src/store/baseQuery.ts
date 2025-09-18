// src/customFetchBaseQuery.ts
import {
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchArgs,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from './slices/loaderSlice';

// Custom base query wrapper
export const customFetchBaseQuery = (): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, // Replace with your API base URL
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.user?.token || '';

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const { dispatch } = api;
    dispatch(showLoader());

    const result = await baseQuery(args, api, extraOptions);

    dispatch(hideLoader());

    if ('error' in result && result.error) {
      const errorData = (result.error as FetchBaseQueryError)?.data;
      const errorMessage =
        errorData && typeof errorData === 'object' && 'message' in errorData
          ? (errorData as { message?: string }).message
          : 'Something went wrong';
      toast.error(errorMessage);
    }

    if (
      'error' in result &&
      (result.error as FetchBaseQueryError).status === 403
    ) {
      localStorage.clear();
      window.location.replace('/login');
    }

    return result;
  };
};

// Query string builder with proper typing
export const buildQueryString = (
  base: string,
  params: Record<string, string | number | boolean | null | undefined>
): string => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join('&');

  return query ? `${base}?${query}` : base;
};
