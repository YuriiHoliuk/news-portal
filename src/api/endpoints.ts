const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://react-express-news-portal.herokuapp.com/api/v1'
    : 'http://127.0.0.1:5000/api/v1';

export const API = {
    baseURL: BASE_URL,
    articles: '/articles',
    comments: '/comments',
};
