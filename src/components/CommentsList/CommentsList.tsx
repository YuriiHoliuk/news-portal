import React, { Component } from 'react';

import { If } from '../../utils';
import Comment from '../Comment';

import { List, Map } from 'immutable';

export interface ICommentsListProps {
    comments: List<Map<string, any>>;
    removeComment: (commentId: string) => void;
}

interface ICommentListState {
    isOpened: boolean;
}

export default class CommentsList extends Component<ICommentsListProps, ICommentListState> {
    state = {
        isOpened: false,
    };

    toggle = () => this.setState((prevState: ICommentListState) => ({ isOpened: !prevState.isOpened }));

    render() {
        const { isOpened } = this.state;
        const { comments, removeComment } = this.props;

        return (
            <div style={{ fontStyle: 'italic' }}>
                <div className='uk-flex uk-flex-between uk-flex-middle'>
                    <p className='uk-margin-remove-bottom'>Comments ({comments.size})</p>

                    <button
                        className='uk-button uk-button-default uk-button-small'
                        onClick={this.toggle}
                    >
                        {isOpened ? 'hide' : 'show'} comments
                    </button>
                </div>

                <If condition={isOpened}>
                    <ul>
                        {comments.map(comment => {
                            const id = comment.get('id');
                            const text = comment.get('text');

                            return (
                                <Comment
                                    key={id}
                                    remove={removeComment.bind(null, id)}
                                    text={text}
                                />
                            );
                        })}
                    </ul>
                </If>
            </div>
        );
    }
}
