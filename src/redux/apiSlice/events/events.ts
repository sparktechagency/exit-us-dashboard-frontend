import api from '../../baseApi/api';

const events = api.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: () => ({
                url: '/event?page=1&limit',
                method: 'GET',
            }),
        }),

        deleteEvents: builder.mutation({
            query: (id) => ({
                url: `/event/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetEventsQuery, useDeleteEventsMutation } = events;
