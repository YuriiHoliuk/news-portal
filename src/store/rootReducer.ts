import { combineReducers } from 'redux-immutable';

import { articlesReducer } from './ducks';

export default combineReducers({
    articles: articlesReducer,
});
