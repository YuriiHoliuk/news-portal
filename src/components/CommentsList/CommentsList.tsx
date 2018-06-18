import React, { Component } from 'react';

import { If } from '../../utils/If';
import { CommentWithRemoveModal } from './components/Comment';

import { IComment } from '../../interfaces';

import * as styles from './commentsList.scss';

export interface ICommentsListProps {
    comments: IComment[];
    removeComment: (commentId: string) => void;
}

interface ICommentListState {
    isOpened: boolean;
}

export class CommentsList extends Component<ICommentsListProps, ICommentListState> {
    state = {
        isOpened: false,
    };

    toggle = (isOpened: boolean) => () => this.setState(() => ({ isOpened }));

    render() {
        const { isOpened } = this.state;
        const { comments, removeComment } = this.props;

        return (
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <p className={styles.title}>Comments ({comments.length})</p>

                    <If condition={!isOpened}>
                        <button
                            className={styles.toggleBtn}
                            onClick={this.toggle(true)}
                        >
                            show comments
                        </button>
                    </If>

                    <If condition={isOpened}>
                        <button
                            className={styles.toggleBtn}
                            onClick={this.toggle(false)}
                        >
                            hide comments
                        </button>
                    </If>
                </div>

                <If condition={isOpened}>
                    <ul className={styles.comments}>
                        {comments.map(({ id, text }) => (
                            <CommentWithRemoveModal
                                key={id}
                                remove={removeComment.bind(null, id)}
                                text={text}
                            />
                        ))}
                    </ul>
                </If>
            </div>
        );
    }
}
