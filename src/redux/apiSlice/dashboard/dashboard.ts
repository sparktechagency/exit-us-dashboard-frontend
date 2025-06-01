import api from '../../baseApi/api';

const dashboard = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => ({
                url: '/dashboard',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetDashboardQuery } = dashboard;
