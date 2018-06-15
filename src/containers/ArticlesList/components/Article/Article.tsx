import React, { Component, SyntheticEvent } from 'react';

import { IArticle } from '../../../../interfaces';
import { If } from '../../../../utils/If';

import * as styles from './article.scss';
import { CommentsList } from '../../../../components/CommentsList';

export interface IArticleProps {
    article: IArticle;
}

interface IArticleState {
    isOpened: boolean;
}

export class Article extends Component<IArticleProps, IArticleState> {
    state = {
        isOpened: false,
    };

    toggle = (isOpened: boolean) => (event: SyntheticEvent) => {
        this.setState(() => ({ isOpened }));
    }

    render() {
        const { title, text, comments } = this.props.article;
        const { isOpened } = this.state;

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
                    <p className={styles.text}>{text}</p>

                    <If condition={isOpened && comments && comments.length}>
                        <CommentsList comments={comments}/>
                    </If>
                </div>
            </div>
        );
    }
}
