import React, { Component, createRef, RefObject } from 'react';

import shave from 'shave';
import * as _ from 'lodash';
import { Map } from 'immutable';

import { If } from '../../utils';
import AppContext from '../../App/AppContext';
import CommentsList from '../CommentsList';
import Button from '../Button';
import { Link } from 'react-router-dom';

export interface IArticleProps {
    article: Map<string, any>;
    remove: () => void;
    removeComment: (commentId: string) => void;
    addComment: (text: string) => void;
    addingComment: boolean;
    removing: boolean;
    removingCommentId: string;
}

interface IArticleState {
    isOpened: boolean;
}

export default class Article extends Component<IArticleProps, IArticleState> {
    state = {
        isOpened: false,
    };

    bodyRef: RefObject<HTMLParagraphElement> = createRef();
    maxHeight: number;
    resizeListener: () => void = _.debounce(() => this.toggleText(this.state.isOpened), 300);

    componentDidMount() {
        this.maxHeight = parseFloat(window.getComputedStyle(this.bodyRef.current).lineHeight) * 2;

        this.toggleText(this.state.isOpened);

        window.addEventListener('resize', this.resizeListener);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListener);
    }

    componentDidUpdate(prevProps: IArticleProps, prevState: IArticleState) {
        if (prevState.isOpened === this.state.isOpened) {
            return;
        }

        this.toggleText(this.state.isOpened);
    }

    toggle = () => this.setState((prevState: IArticleState) => ({ isOpened: !prevState.isOpened }));

    toggleText(isOpened: boolean) {
        const maxHeight = isOpened ? Infinity : this.maxHeight;

        shave(this.bodyRef.current, maxHeight);
    }

    render() {
        const { remove, removeComment, article, addComment, addingComment, removing, removingCommentId } = this.props;

        const title = article.get('title');
        const text = article.get('text');
        const slug = article.get('slug');
        const comments = article.get('comments');
        const image = article.get('image');

        const { isOpened } = this.state;

        return (
            <div className='uk-margin-large-bottom'>
                <div className='uk-flex uk-flex-middle uk-margin'>
                    <h2 className='uk-heading-secondary uk-margin-remove-bottom uk-margin-right'>{title}</h2>

                    <Link to={`/article/${slug}`}>
                        <span className='uk-button uk-button-default'>Open article</span>
                    </Link>

                    <AppContext.Consumer>
                        {({ proMode }) => proMode && (
                            <Button
                                loading={removing}
                                className='uk-button uk-button-danger uk-margin-left'
                                onClick={remove}
                            >
                                remove article
                            </Button>
                        )}
                    </AppContext.Consumer>
                </div>

                <If condition={!!image && isOpened}>
                    <img
                        className='uk-margin-right uk-margin-small-bottom'
                        style={{ maxWidth: '62%', height: 'auto', float: 'left', display: 'inline-block' }}
                        src={image}
                        alt='Article Illustration'
                    />
                </If>

                <p ref={this.bodyRef}>{text}</p>

                <div style={{ clear: 'left' }}/>

                <If condition={isOpened}>
                    <CommentsList
                        removingCommentId={removingCommentId}
                        addingComment={addingComment}
                        addComment={addComment}
                        removeComment={removeComment}
                        comments={comments}
                    />
                </If>
            </div>
        );
    }
}
