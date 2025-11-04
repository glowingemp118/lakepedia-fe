import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../baseQuery";


export const lakeApi = createApi({
    reducerPath: "lake",
    baseQuery: customFetchBaseQuery(),
    endpoints: (builder) => ({
        createLake: builder.mutation({
            query: (lake) => ({
                url: "/business/lake",
                method: "POST",
                body: lake,
            }),
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
        }),
        updateLake: builder.mutation({
            query: ({ lakeId, ...lake }) => ({
                url: `/lakes/${lakeId}`,
                method: "PUT",
                body: lake,
            }),
        }),
        deleteLake: builder.mutation({
            query: (lakeId) => ({
                url: `/lakes/${lakeId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useCreateLakeMutation, useGetAllLakesQuery, useUpdateLakeMutation, useDeleteLakeMutation } = lakeApi;
