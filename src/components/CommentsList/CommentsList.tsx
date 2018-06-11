import React, {Component, SyntheticEvent} from 'react';
import {IComment} from '../../interfaces/index';
import * as styles from './commentsList.scss';
import {If} from '../../utils/If/index';

export interface ICommentsListProps {
    comments: IComment[];
}

interface ICommentListState {
    isOpened: boolean;
}

export class CommentsList extends Component<ICommentsListProps, ICommentListState> {
    state = {
        isOpened: false,
    };

    toggle = (isOpened: boolean) => (event: SyntheticEvent) => {
        this.setState(() => ({isOpened}));
    }

    render() {
        const { isOpened } = this.state;
        const { comments } = this.props;

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
                        {comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
                    </ul>
                </If>
            </div>
        );
    }
}
