import React from 'react';
import { Redirect, Route } from 'react-router';

const PublicRoute = ({ isLoggedIn, path, component }) => isLoggedIn
    ? <Redirect to='/'/>
    : <Route path={path} component={component}/>;

export default PublicRoute;
