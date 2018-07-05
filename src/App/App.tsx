import React, { Component } from 'react';
import AppContext from './AppContext';

import AppHeader from '../components/AppHeader';
import Routes from '../Routes';

export interface IAppProps {
    isLoggedIn: boolean;
    account: Map<string, string>;
    signOut: () => any;
    getAccount: () => any;
    token: string;
    history: any;
}

export default class App extends Component<IAppProps, {}> {

    componentDidMount() {
        const { isLoggedIn, getAccount, token } = this.props;

        if (!isLoggedIn && token) {
            getAccount();
        }
    }

    render() {
        const { isLoggedIn, account, signOut, history } = this.props;

        return (
            <div className='uk-padding'>
                <AppContext.Provider value={{ proMode: isLoggedIn }}>
                    <AppHeader
                        history={history}
                        signOut={signOut}
                        name={account && account.get('name')}
                        isLoggedIn={isLoggedIn}
                        title={'News Portal'}
                    />

                    <Routes/>
                </AppContext.Provider>
            </div>
        );
    }
}
