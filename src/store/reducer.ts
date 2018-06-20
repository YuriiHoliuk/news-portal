import { combineReducers } from 'redux';

import articleReducer from '../ducks/articlesDuck';

export default combineReducers({
    articles: articleReducer,
});
