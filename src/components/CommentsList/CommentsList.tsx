import React, { Component, Fragment } from 'react';
import { List, Map } from 'immutable';

import { If } from '../../utils';

import Comment from '../Comment';
import AddCommentForm from '../AddCommentForm';
import AppContext from '../../App/AppContext';

export interface ICommentsListProps {
    comments: List<Map<string, any>>;
    removeComment: (commentId: string) => void;
    addComment: (text: string) => void;
    addingComment: boolean;
    removingCommentId: string;
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
        const { comments, removeComment, addingComment, removingCommentId } = this.props;

        return (
            <div className='uk-margin-small-top' style={{ fontStyle: 'italic' }}>
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
                                    const text = comment.get('comment');

                                    return (
                                        <Comment
                                            removing={removingCommentId === id}
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

                <AppContext.Consumer>
                    {({ proMode }) => proMode && (
                        <If condition={isOpened || (!comments || (comments && !comments.size))}>
                            <AddCommentForm loading={addingComment} addComment={this.addComment}/>
                        </If>
                    )}
                </AppContext.Consumer>
            </div>
        );
    }
}
