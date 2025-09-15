import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shariful5001.binarybards.online/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: () => ({}),

    tagTypes: ['Disclaimer', 'event', 'Donate', 'package'],
});

export const imageUrl = 'https://shariful5001.binarybards.online';
