import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from '../baseQuery';

export const fileApi = createApi({
    reducerPath: "fileApi",
    baseQuery: customFetchBaseQuery(),
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (fileData) => {
                const formData = new FormData();
                formData.append('file', fileData);
                return {
                    url: `/file`,
                    method: 'POST',
                    body: formData,
                };
            }
        }),
        deleteFile: builder.mutation({
            query: (fileId) => ({
                url: `/file/remove/${fileId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useUploadFileMutation,
    useDeleteFileMutation,
} = fileApi;
