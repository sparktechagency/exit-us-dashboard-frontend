import api from '../../baseApi/api';

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
                body: data,
            }),
        }),

        veryfyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),

        resetPassword: builder.mutation({
            query: (data) => {
                const resetToken = localStorage.getItem('accessToken');
                return {
                    url: '/auth/reset-password',
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: `Bearer ${resetToken}`,
                    },
                };
            },
        }),
    }),
});

export const { useLoginMutation, useForgetPasswordMutation, useVeryfyOtpMutation } = auth;
