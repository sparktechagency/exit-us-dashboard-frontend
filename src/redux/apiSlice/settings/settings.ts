import api from '../../baseApi/api';

const settings = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
        }),

        UpdateProfile: builder.mutation({
            query: (data) => ({
                url: '/edit-profile',
                method: 'POST',
                body: data,
            }),
        }),

        // privacy
        getPrivacy: builder.query({
            query: () => ({
                url: '/disclaimer?type=privacy',
                method: 'GET',
            }),
        }),

        UpdatePrivacy: builder.mutation({
            query: (data) => ({
                url: '/disclaimer',
                method: 'POST',
                body: data,
            }),
        }),

        // terms condition
        getTermsCondition: builder.query({
            query: () => ({
                url: '/disclaimer?type=terms',
                method: 'GET',
            }),
        }),

        UpdateTermsCondition: builder.mutation({
            query: (data) => ({
                url: '/disclaimer',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetPrivacyQuery,
    useUpdatePrivacyMutation,
    useGetTermsConditionQuery,
    useUpdateTermsConditionMutation,
} = settings;
