import { api } from '../../baseApi/api';

const auth = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),

        forgetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: { email: data },
            }),
        }),

        veryfyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body: data,
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ token, data }) => {
                return {
                    url: '/auth/reset-password',
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: token,
                    },
                };
            },
        }),
    }),
});

export const { useLoginMutation, useForgetPasswordMutation, useVeryfyOtpMutation, useResetPasswordMutation } = auth;
