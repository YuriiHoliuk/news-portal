import React, { Component, createRef, RefObject } from 'react';

import shave from 'shave';
import * as _ from 'lodash';

import { If } from '../../utils';
import CommentsList from '../CommentsList';
import AppContext from '../../App/AppContext';

import { IArticle } from '../../interfaces';

import * as styles from './article.scss';

export interface IArticleProps {
    article: IArticle;
    remove: () => void;
    removeComment: (commentId: string) => void;
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

    toggle = (isOpened: boolean) => () => this.setState(() => ({ isOpened }));

    toggleText(isOpened: boolean) {
        const maxHeight = isOpened ? Infinity : this.maxHeight;

        shave(this.bodyRef.current, maxHeight);
    }

    render() {
        const { remove, removeComment } = this.props;
        const { title, text, comments } = this.props.article;
        const { isOpened } = this.state;

        return (
            <div className={'uk-margin-bottom'}>
                <div className={styles.header + ' uk-margin'}>
                    <h2 className={'uk-heading-secondary uk-margin-remove-bottom uk-margin-right'}>{title}</h2>

                    <If condition={!isOpened}>
                        <button
                            className={'uk-button uk-button-default'}
                            onClick={this.toggle(true)}
                        >
                            show article
                        </button>
                    </If>

                    <If condition={isOpened}>
                        <button
                            className={'uk-button uk-button-default'}
                            onClick={this.toggle(false)}
                        >
                            hide article
                        </button>
                    </If>

                    <AppContext.Consumer>
                        {({ proMode }) => proMode && (
                            <button
                                className={'uk-button uk-button-danger uk-margin-left'}
                                onClick={remove}
                            >
                                remove article
                            </button>
                        )}
                    </AppContext.Consumer>
                </div>

                <div>
                    <p ref={this.bodyRef}>{text}</p>

                    <If condition={isOpened && comments && comments.length}>
                        <CommentsList removeComment={removeComment} comments={comments}/>
                    </If>
                </div>
            </div>
        );
    }
}
