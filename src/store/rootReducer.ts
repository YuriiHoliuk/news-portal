import { combineReducers } from 'redux-immutable';

import { articlesReducer, authReducer } from './ducks';

export default combineReducers({
    articles: articlesReducer,
    auth: authReducer,
});
