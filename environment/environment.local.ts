export const env = {
    api: {
        baseURL: 'http://127.0.0.1:5000/api/v1',
        auth: {
            signIn: '/auth/sign-in',
            signUp: '/auth/sign-up',
            restorePassword: '/auth/restore-password', // TODO
        },
        user: {
            details: '/user/details',
            changePassword: '/user/change-password', // TODO
        },
        articles: {
            get: '/articles',
            add: '/articles',
            update: '/articles',
            remove: '/articles',
        },
        comments: {
            add: '/comments',
            remove: '/comments',
        },
    },
};
