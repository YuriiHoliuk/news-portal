// PACKAGE DEPENDENCIES
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// STORE
import store from './store/store';

// COMPONENTS
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app'),
);
