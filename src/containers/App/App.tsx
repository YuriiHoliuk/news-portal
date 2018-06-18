import React, { Component, Context, createContext } from 'react';

import { ArticlesList } from '../ArticlesList';

import styles from './app.scss';

export const AppContext: Context<IAppState> = createContext({ proMode: false });

interface IAppState {
    proMode: boolean;
}

export class App extends Component<{}, IAppState> {

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
