import React from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ isLoggedIn, path, component }) => isLoggedIn
    ? <Route path={path} component={component}/>
    : <Redirect to='/'/>;

export default PrivateRoute;
