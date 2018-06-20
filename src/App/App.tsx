import React, { Component } from 'react';

import ArticlesList from '../components/ArticlesList';
import AppContext from './AppContext';

import styles from './app.scss';
import AddArticleForm from '../components/AddArticleForm';

export interface IAppState {
    proMode: boolean;
}

export default class App extends Component<{}, IAppState> {

    state = {
        proMode: false,
    };

    toggleProMode = () => this.setState((prevState: IAppState) => ({ proMode: !prevState.proMode }));

    render() {
        const { proMode } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={'uk-heading-primary ' + styles.title}>
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

                <div className={styles.articles}>
                    <AppContext.Provider value={{ proMode }}>
                        <ArticlesList/>
                        <AddArticleForm/>
                    </AppContext.Provider>
                </div>
            </div>
        );
    }
}
