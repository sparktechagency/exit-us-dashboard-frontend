import { api } from '../../baseApi/api';

const donateApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllDonates: builder.query({
            query: () => ({
                url: '/donate',
                method: 'GET',
            }),
            providesTags: ['Donate'],
        }),
    }),
});

export const { useGetAllDonatesQuery } = donateApi;
