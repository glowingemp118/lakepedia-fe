import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../baseQuery";


export const lakeApi = createApi({
    reducerPath: "lake",
    baseQuery: customFetchBaseQuery(),
    tagTypes: ["Lake"],
    endpoints: (builder) => ({
        createLake: builder.mutation({
            query: (lake) => ({
                url: "/business/lake",
                method: "POST",
                body: lake,
            }),
            invalidatesTags: ["Lake"],
        }),
        getAllLakes: builder.query({
            query: ({ search, page }) => {
                let url = '/lakes'
                if (search) {
                    url += `?search=${search}`
                }
                if (page) {
                    url += `?page=${page}`
                }
                return url
            },
            // providesTags: ["Lake"],
        }),
        getBusinessLakes: builder.query({
            query: ({ page }) => {
                let url = '/business/lake';
                if (page) {
                    url += `?page=${page}`;
                }
                return url;
            },
            providesTags: ["Lake"],
        }),
        updateLake: builder.mutation({
            query: ({ lakeId, ...lake }) => ({
                url: `/lakes/${lakeId}`,
                method: "PUT",
                body: lake,
            }),
            invalidatesTags: ["Lake"],
        }),
        deleteLake: builder.mutation({
            query: (lakeId) => ({
                url: `/business/lake/${lakeId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Lake"],
        }),
    }),
});

export const { useCreateLakeMutation, useGetAllLakesQuery, useUpdateLakeMutation, useDeleteLakeMutation, useGetBusinessLakesQuery } = lakeApi;
