import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ArticlesList from '../components/ArticlesList';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import AddArticleForm from '../components/AddArticleForm';
import Article from '../components/Article';

const Routes = props => (
    <Switch>
        <Route path='/' exact component={ArticlesList}/>
        <Route path='/sign-in' component={SignInForm}/>
        <Route path='/sign-up' component={SignUpForm}/>
        <Route path='/article/create' component={AddArticleForm}/>
        <Route path='/article/edit/:slug' component={AddArticleForm}/>
        <Route path='/article/:slug' component={Article}/>
    </Switch>
);

export default Routes;
