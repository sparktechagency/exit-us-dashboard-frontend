import { api } from '../../baseApi/api';

const allMeetps = api.injectEndpoints({
    endpoints: (builder) => ({
        getMeetups: builder.query({
            query: () => ({
                url: '/meetup',
                method: 'GET',
            }),
        }),

        deleteMeetups: builder.mutation({
            query: (id) => ({
                url: `/meetup/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetMeetupsQuery, useDeleteMeetupsMutation } = allMeetps;
