import React, { Component } from 'react';

import logo from '../../logo.png';
import styles from './app.scss';

export class App extends Component<{}, {}> {

    render() {
        return (
            <div className={styles.container}>
                <img className={styles.logo} src={logo} />
                <h1 className={styles.title}>React Starter</h1>
            </div>
        );
    }
}
