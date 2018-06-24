import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import { apiThunk } from './middlewares';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(apiThunk, thunk),
    ),
);

export default store;
