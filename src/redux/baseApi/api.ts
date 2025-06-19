import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://119.148.56.246:5000/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: () => ({}),

    tagTypes: ['Disclaimer', 'event', 'Donate'],
});

export const imageUrl = 'http://119.148.56.246:5000';
