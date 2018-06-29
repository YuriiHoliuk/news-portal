import React, { Component } from 'react';

import { If } from '../utils';

import ArticlesList from '../components/ArticlesList';
import AppContext from './AppContext';

import AppHeader from '../components/AppHeader';
import AddArticleForm from '../components/AddArticleForm';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

export interface IAppProps {
    isLoggedIn: boolean;
    account: Map<string, string>;
    signOut: () => any;
    getAccount: () => any;
    token: string;
}

export default class App extends Component<IAppProps, {}> {

    componentDidMount() {
        const { isLoggedIn, getAccount, token } = this.props;

        if (!isLoggedIn && token) {
            getAccount();
        }
    }

    render() {
        const { isLoggedIn, account, signOut } = this.props;

        return (
            <div className='uk-padding'>
                <AppContext.Provider value={{ proMode: isLoggedIn }}>
                    <AppHeader
                        signOut={signOut}
                        name={account && account.get('name')}
                        isLoggedIn={isLoggedIn}
                        title={'News Portal'}
                    />

                    <If condition={!isLoggedIn}>
                        <div className='uk-flex uk-margin-large-bottom'>
                            <div className='uk-margin-large-right'>
                                <SignInForm/>
                            </div>
                            <div className='uk-margin-large-left'>
                                <SignUpForm/>
                            </div>
                        </div>
                    </If>

                    <ArticlesList/>

                    <If condition={isLoggedIn}>
                        <AddArticleForm/>
                    </If>
                </AppContext.Provider>
            </div>
        );
    }
}
