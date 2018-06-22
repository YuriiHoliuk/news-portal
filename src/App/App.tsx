import React, { Component } from 'react';

import ArticlesList from '../components/ArticlesList';
import AppContext from './AppContext';

import AddArticleForm from '../components/AddArticleForm';

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
            <div className={'uk-padding'}>
                <div className={'uk-flex uk-flex-between uk-flex-middle uk-margin-large-bottom'}>
                    <h1 className={'uk-heading-primary uk-margin-remove-bottom'}>
                        News Portal
                    </h1>

                    <button
                        className={'uk-button uk-button-secondary'}
                        type='button'
                        onClick={this.toggleProMode}
                    >
                        {proMode ? 'Off' : 'On'} Pro Mode
                    </button>
                </div>

                <AppContext.Provider value={{ proMode }}>
                    <ArticlesList/>
                    <AddArticleForm/>
                </AppContext.Provider>
            </div>
        );
    }
}
