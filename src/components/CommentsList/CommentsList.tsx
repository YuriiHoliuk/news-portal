import React, { Component } from 'react';

import { If } from '../../utils';
import Comment from '../Comment';

import { IComment } from '../../interfaces';

import * as styles from './commentsList.scss';

export interface ICommentsListProps {
    comments: IComment[];
    removeComment: (commentId: string) => void;
}

interface ICommentListState {
    isOpened: boolean;
}

export default class CommentsList extends Component<ICommentsListProps, ICommentListState> {
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
                    <p className={'uk-margin-remove-bottom'}>Comments ({comments.length})</p>

                    <If condition={!isOpened}>
                        <button
                            className={'uk-button uk-button-default uk-button-small'}
                            onClick={this.toggle(true)}
                        >
                            show comments
                        </button>
                    </If>

                    <If condition={isOpened}>
                        <button
                            className={'uk-button uk-button-default uk-button-small'}
                            onClick={this.toggle(false)}
                        >
                            hide comments
                        </button>
                    </If>
                </div>

                <If condition={isOpened}>
                    <ul className={styles.comments}>
                        {comments.map(({ id, text }) => (
                            <Comment
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
