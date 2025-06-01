import api from '../../baseApi/api';

const users = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: '/user?page=&limit',
                method: 'GET',
            }),
        }),

        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = users;
