import React, { Component } from 'react';

import ArticlesList from '../components/ArticlesList';
import AppContext from './AppContext';

import styles from './app.scss';

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
                <h1 className={styles.title}>
                    News Portal
                    <button type='button' onClick={this.toggleProMode}>{proMode ? 'Off' : 'On'} Pro Mode</button>
                </h1>

                <div className={styles.articles}>
                    <AppContext.Provider value={{ proMode }}>
                        <ArticlesList/>
                    </AppContext.Provider>
                </div>
            </div>
        );
    }
}
