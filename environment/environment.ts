export const env = {
    api: {
        baseURL: 'https://mateacademy-react-server.herokuapp.com/api/v1',
        auth: {
            signIn: '/auth/signin',
            signUp: '/auth/signup',
            restorePassword: '/auth/restore-password',
        },
        user: {
            details: '/user/details',
            changePassword: '/user/change-password',
        },
        articles: {
            get: '/article/get',
            add: '/article/create',
            update: '/article/update',
            remove: '/article/remove',
        },
        comments: {
            add: '/comment/create',
            remove: '/comment/remove',
        },
    },
};
