import { createApi } from "@reduxjs/toolkit/query/react";

import { customFetchBaseQuery } from "../baseQuery";

// Define the API slice

export const businessApi = createApi({
    reducerPath: "businessApi", // Unique name for the API slice
    baseQuery: customFetchBaseQuery(),
    tagTypes: ["Business"], // Define the tag type for caching
    endpoints: (builder: any) => ({
        updateBusiness: builder.mutation({
            query: (data: any) => ({
                url: `/business`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Business"],
        }),
        createBusiness: builder.mutation({
            query: (data: any) => ({
                url: `/business`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Business"],
        }),
        getBusiness: builder.query({
            query: () => `/business/single`,
            providesTags: ["Business"],
            transformResponse: (res: any) => res.data,
        }),
    }),
});

export const {
    useUpdateBusinessMutation,
    useCreateBusinessMutation,
    useGetBusinessQuery
} = businessApi;