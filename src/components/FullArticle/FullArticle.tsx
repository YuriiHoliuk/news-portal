import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { If } from '../../utils';
import CommentsList from '../CommentsList/CommentsList';
import AppContext from '../../App/AppContext';

export default class FullArticle extends Component<any, any> {

    componentDidMount() {
        this.props.loadArticle(this.props.match.params.slug);
    }

    render() {
        const {
            remove,
            removeComment,
            article,
            addComment,
            addingComment,
            removing,
            removingCommentId,
            loadArticle,
        } = this.props;

        const title = article.get('title');
        const text = article.get('text');
        const slug = article.get('slug');
        const comments = article.get('comments');
        const image = article.get('image');

        return article ? (
            <div className='uk-margin-large-bottom'>
                <div className='uk-flex uk-flex-middle uk-margin'>
                    <h2 className='uk-heading-secondary uk-margin-remove-bottom uk-margin-right'>{title}</h2>

                    <AppContext.Consumer>
                        {({ proMode }) => proMode && (
                            <Fragment>
                                <Link to={`/article/edit/${slug}`}>
                                    <span className='uk-button uk-button-primary uk-margin-left'>Edit Article</span>
                                </Link>

                                <Button
                                    loading={removing}
                                    className='uk-button uk-button-danger uk-margin-left'
                                    onClick={remove}
                                >
                                    remove article
                                </Button>
                            </Fragment>
                        )}
                    </AppContext.Consumer>
                </div>

                <If condition={!!image}>
                    <img
                        className='uk-margin-right uk-margin-small-bottom'
                        style={{ maxWidth: '62%', height: 'auto', float: 'left', display: 'inline-block' }}
                        src={image}
                        alt='Article Illustration'
                    />
                </If>

                <p>{text}</p>

                <div style={{ clear: 'left' }}/>

                <CommentsList
                    removingCommentId={removingCommentId}
                    addingComment={addingComment}
                    addComment={addComment}
                    removeComment={removeComment}
                    comments={comments}
                />
            </div>
        ) : <div>Loading Article...</div>;
    }
}
