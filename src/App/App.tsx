import React, { Component } from 'react';

import ArticlesList from '../components/ArticlesList';
import AppContext from './AppContext';

import AddArticleForm from '../components/AddArticleForm';
import AppHeader from '../components/AppHeader/AppHeader';

export interface IAppState {
    proMode: boolean;
}

export default class App extends Component<{}, IAppState> {

    state = {
        proMode: true,
    };

    toggleProMode = () => this.setState((prevState: IAppState) => ({ proMode: !prevState.proMode }));

    render() {
        const { proMode } = this.state;

        return (
            <div className='uk-padding'>
                <AppContext.Provider value={{ proMode, toggleProMode: this.toggleProMode }}>
                    <AppHeader title={'News Portal'}/>
                    <ArticlesList/>
                    <AddArticleForm/>
                </AppContext.Provider>
            </div>
        );
    }
}
