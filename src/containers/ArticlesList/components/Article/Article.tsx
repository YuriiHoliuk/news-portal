import React, {Component, SyntheticEvent} from 'react';

import {IArticle} from '../../../../interfaces/index';
import {If} from '../../../../utils/If/index';

import * as styles from './article.scss';
import {CommentsList} from '../../../../components/CommentsList/index';

export interface IArticleProps {
    article: IArticle;
}

interface IArticleState {
    isOpened: boolean;
}

export class Article extends Component<IArticle, IArticleState> {
    state = {
        isOpened: false,
    };

    toggle = (isOpened: boolean) => (event: SyntheticEvent) => {
        this.setState(() => ({isOpened}));
    }

    render() {
        const {title, text, comments} = this.props;
        const {isOpened} = this.state;

        return (
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>

                    <If condition={!isOpened}>
                        <button
                            className={styles.toggleBtn}
                            onClick={this.toggle(true)}
                        >
                            show article
                        </button>
                    </If>

                    <If condition={isOpened}>
                        <button
                            className={styles.toggleBtn}
                            onClick={this.toggle(false)}
                        >
                            hide article
                        </button>
                    </If>
                </div>

                <div className={styles.body}>
                    <If condition={isOpened}>
                        <p className={styles.text}>{text}</p>

                        <If condition={comments && comments.length}>
                            <CommentsList comments={comments}/>
                        </If>
                    </If>
                </div>
            </div>
        );
    }
}
