// PACKAGE DEPENDENCIES
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// COMPONENTS
import store from './store/store';
import App from './App';
// STYLES
import 'normalize.css';
import './styles/global.scss';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app'),
);
