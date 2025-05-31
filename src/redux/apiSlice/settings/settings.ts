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
                url: '/privacy-policy',
                method: 'GET',
            }),
        }),

        UpdatePrivacy: builder.mutation({
            query: (data) => ({
                url: '/privacy-policy',
                method: 'POST',
                body: data,
            }),
        }),

        // terms condition
        getTermsCondition: builder.query({
            query: () => ({
                url: '/terms-condition',
                method: 'GET',
            }),
        }),

        UpdateTermsCondition: builder.mutation({
            query: (data) => ({
                url: '/terms-condition',
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
