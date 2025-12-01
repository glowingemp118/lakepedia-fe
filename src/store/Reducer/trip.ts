import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../baseQuery";


export const tripApi = createApi({
    reducerPath: "trip",
    baseQuery: customFetchBaseQuery(),
    tagTypes: ["Trip", "Event"],
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
            query: ({ id }) => ({
                url: `/trip/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Trip"],
        }),
        createTripEvent: builder.mutation({
            query: ({ tripId, eventData }) => ({
                url: `/trip/${tripId}/schedule`,
                method: "POST",
                body: eventData,
            }),
            invalidatesTags: ["Event"],
        }),
        editTripEvent: builder.mutation({
            query: ({ tripId, eventId, eventData }) => ({
                url: `/trip/schedule/${eventId}`,
                method: "PUT",
                body: eventData,
            }),
            invalidatesTags: ["Event"],
        }),
        deleteTripEvent: builder.mutation({
            query: ({ eventId }) => ({
                url: `/trip/schedule/${eventId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Event"]
        }),
        getTripEvents: builder.query({
            query: (tripId) => ({
                url: `/trip/${tripId}/schedule`,
            }),
            providesTags: ["Event"],
        }),
    }),
});

export const {
    useCreateTripMutation,
    useGetAllTripsQuery,
    useUpdateTripMutation,
    useDeleteTripMutation,
    useGetTripByIdQuery,
    useCreateTripEventMutation,
    useEditTripEventMutation,
    useGetTripEventsQuery,
    useDeleteTripEventMutation
} = tripApi;
