import { combineReducers } from 'redux-immutable';

import { articlesReducer, authReducer, articleReducer } from './ducks';

export default combineReducers({
    articles: articlesReducer,
    auth: authReducer,
    article: articleReducer,
});
