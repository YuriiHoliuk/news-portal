import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormsReducer } from 'redux-form';

import { articlesReducer, authReducer, articleReducer } from './ducks';

export default combineReducers({
    articles: articlesReducer,
    auth: authReducer,
    article: articleReducer,
    form: reduxFormsReducer,
});
