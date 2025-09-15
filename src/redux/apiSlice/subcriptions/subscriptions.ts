import { api } from '../../baseApi/api';

const subscrption = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscription: builder.query({
            query: () => ({
                url: '/package',
                method: 'GET',
            }),
            providesTags: ['package'],
        }),
        editSubscription: builder.mutation({
            query: ({ id, data }) => ({
                url: `/package/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['package'],
        }),

        createSubscription: builder.mutation({
            query: (data) => ({
                url: '/package',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['package'],
        }),
        deleteSubscription: builder.mutation({
            query: (id) => ({
                url: `/package/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['package'],
        }),
    }),
});

export const {
    useGetAllSubscriptionQuery,
    useEditSubscriptionMutation,
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
} = subscrption;
