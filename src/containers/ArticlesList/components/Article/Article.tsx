import React, { Component, SyntheticEvent, createRef, RefObject } from 'react';
import shave from 'shave';
import * as _ from 'lodash';

import { IArticle } from '../../../../interfaces';
import { If } from '../../../../utils/If';
import { CommentsList } from '../../../../components/CommentsList';

import * as styles from './article.scss';

export interface IArticleProps {
    article: IArticle;
}

interface IArticleState {
    isOpened: boolean;
}

export class Article extends Component<any, IArticleState> {
    state = {
        isOpened: false,
    };

    bodyRef: RefObject<HTMLParagraphElement> = createRef();
    maxHeight: number;
    resizeListener: () => void = _.debounce(() => this.toggleText(this.state.isOpened), 300);

    componentDidMount() {
        this.maxHeight = parseFloat(window.getComputedStyle(this.bodyRef.current).lineHeight) * 5;

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

    toggle = (isOpened: boolean) => (event: SyntheticEvent) => this.setState(() => ({ isOpened }));

    toggleText(isOpened: boolean) {
        const maxHeight = isOpened ? Infinity : this.maxHeight;

        shave(this.bodyRef.current, maxHeight);
    }

    render() {
        const { openRemoveModal } = this.props;
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

                    <button
                        className={styles.toggleBtn}
                        onClick={openRemoveModal}
                    >
                        remove article
                    </button>
                </div>

                <div className={styles.body}>
                    <p ref={this.bodyRef} className={styles.text}>{text}</p>

                    <If condition={isOpened && comments && comments.length}>
                        <CommentsList comments={comments}/>
                    </If>
                </div>
            </div>
        );
    }
}
