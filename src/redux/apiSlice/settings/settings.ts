import api from '../../baseApi/api';

const settings = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
        }),

        UpdateProfile: builder.mutation({
            query: (data) => ({
                url: '/user/profile',
                method: 'PATCH',
                body: data,
            }),
        }),

        // privacy
        getDisclaimer: builder.query({
            query: ({ query }) => {
                return {
                    url: `/disclaimer${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Disclaimer'],
        }),

        UpdateDisclaimer: builder.mutation({
            query: ({ payload }) => ({
                url: '/disclaimer',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Disclaimer'],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useGetDisclaimerQuery, useUpdateDisclaimerMutation } =
    settings;
