export const env = {
    api: {
        baseURL: 'https://react-express-news-portal.herokuapp.com/api/v1',
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
