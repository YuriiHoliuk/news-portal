import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ArticlesList from '../components/ArticlesList';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import AddArticleForm from '../components/AddArticleForm';
import Article from '../components/Article';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

const Routes = props => (
    <Switch>
        <Route path='/' exact component={ArticlesList}/>
        <PublicRoute path='/sign-in' component={SignInForm}/>
        <PublicRoute path='/sign-up' component={SignUpForm}/>
        <PrivateRoute path='/article/create' component={AddArticleForm}/>
        <PrivateRoute path='/article/edit/:slug' component={AddArticleForm}/>
        <Route path='/article/:slug' component={Article}/>
    </Switch>
);

export default Routes;
