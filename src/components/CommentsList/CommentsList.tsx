import React, { Component, createRef, Fragment, RefObject } from 'react';

import { If } from '../../utils';
import Comment from '../Comment';

import { List, Map } from 'immutable';

export interface ICommentsListProps {
    comments: List<Map<string, any>>;
    removeComment: (commentId: string) => void;
    addComment: (text: string) => void;
}

export default class CommentsList extends Component<ICommentsListProps, any> {
    state = {
        isOpened: true,
        newCommentText: '',
    };

    formRef: RefObject<HTMLFormElement> = createRef();

    toggle = () => this.setState(prevState => ({ isOpened: !prevState.isOpened }));

    addComment = (event) => {
        event.preventDefault();

        if (this.formRef.current.checkValidity()) {
            this.props.addComment(this.state.newCommentText);
            this.setState({ isOpened: true });
        }
    }

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    render() {
        const { isOpened, newCommentText } = this.state;
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
                    <form className='uk-flex' ref={this.formRef} onSubmit={this.addComment}>

                        <fieldset className='uk-fieldset uk-margin-small-right'>
                            <input
                                className='uk-input uk-form-small'
                                type='text'
                                name='newCommentText'
                                value={newCommentText}
                                onChange={this.handleChange}
                            />
                        </fieldset>

                        <button className='uk-button uk-button-primary uk-button-small'>
                            Add Comment
                        </button>

                    </form>
                </If>
            </div>
        );
    }
}
