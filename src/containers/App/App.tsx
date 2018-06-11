import React, {Component} from 'react';

import styles from './app.scss';
import {ArticlesList} from '../ArticlesList';

export class App extends Component<{}, {}> {

    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>News Portal</h1>

                <div className={styles.articles}>
                    <ArticlesList/>
                </div>
            </div>
        );
    }
}
