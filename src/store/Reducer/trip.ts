import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../baseQuery";


export const tripApi = createApi({
    reducerPath: "trip",
    baseQuery: customFetchBaseQuery(),
    tagTypes: ["Trip"],
    endpoints: (builder) => ({
        createTrip: builder.mutation({
            query: (trip) => ({
                url: "/trip",
                method: "POST",
                body: trip,
            }),
            invalidatesTags: ["Trip"],
        }),
        getAllTrips: builder.query({
            query: () => ({
                url: "/trip",
            }),
            providesTags: ["Trip"],
        }),
        getTripById: builder.query({
            query: (tripId) => ({
                url: `/trip/${tripId}`,
            }),
            providesTags: ["Trip"],
        }),
            updateTrip: builder.mutation({
                query: ({ id, data }) => ({
                    url: `/trip/${id}`,
                    method: "PUT",
                    body: data,
                }),
                invalidatesTags: ["Trip"],
            }),
            deleteTrip: builder.mutation({
                query: (tripId) => ({
                    url: `/trips/${tripId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Trip"],
            }),
        }),
    });

    export const {
        useCreateTripMutation,
        useGetAllTripsQuery,
        useUpdateTripMutation,
        useDeleteTripMutation,
        useGetTripByIdQuery
    } = tripApi;
