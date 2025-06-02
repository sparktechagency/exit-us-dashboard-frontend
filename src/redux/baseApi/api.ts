import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.0.70.146:5002/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: () => ({}),
    tagTypes: ['Disclaimer'],
});

export const imageUrl = 'http://10.0.70.146:5002';

export default api;
