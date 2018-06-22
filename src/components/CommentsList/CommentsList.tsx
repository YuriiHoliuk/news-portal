import React, { Component, Fragment } from 'react';
import { List, Map } from 'immutable';

import { If } from '../../utils';

import Comment from '../Comment';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

export interface ICommentsListProps {
    comments: List<Map<string, any>>;
    removeComment: (commentId: string) => void;
    addComment: (text: string) => void;
}

export default class CommentsList extends Component<ICommentsListProps, any> {
    state = {
        isOpened: false,
    };

    toggle = () => this.setState(prevState => ({ isOpened: !prevState.isOpened }));

    addComment = (text) => {
        this.props.addComment(text);
        this.setState({ isOpened: true });
    }

    render() {
        const { isOpened } = this.state;
        const { comments, removeComment } = this.props;

        return (
            <div style={{ fontStyle: 'italic' }}>
                {comments && !!comments.size && (
                    <Fragment>
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
                    </Fragment>
                )}

                <If condition={isOpened || (!comments || (comments && !comments.size))}>
                    <AddCommentForm addComment={this.addComment}/>
                </If>
            </div>
        );
    }
}
