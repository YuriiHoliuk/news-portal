import React, { Component } from 'react';
import { List, Map } from 'immutable';

import Article from '../Article';
import { If } from '../../utils';

interface IArticlesListProps {
    articles: List<Map<string, any>>;
    loadArticles: () => any;
    removeArticle: (articleId: string) => any;
    removeComment: (commentId: string) => any;
    addComment: (articleId: string, text: string) => any;
    addingCommentArticleId: string;
    removingArticleId: string;
    removingCommentId: string;
    error: string;
}

export default class ArticlesList extends Component<IArticlesListProps, any> {
    componentDidMount() {
        this.props.loadArticles();
    }

    render() {
        const {
            articles,
            removeComment,
            removeArticle,
            addComment,
            addingCommentArticleId,
            removingArticleId,
            removingCommentId,
            error,
        } = this.props;

        return (
            <div className='uk-margin-xlarge-bottom'>

                <If condition={!!error}>
                    <p className='uk-alert-danger' uk-alert=''>{error}</p>
                </If>

                {articles && articles
                    .map(article => {
                            const id = article.get('_id');
                            const slug = article.get('slug');

                            return (
                                <Article
                                    removing={id === removingArticleId}
                                    addingComment={id === addingCommentArticleId}
                                    removingCommentId={removingCommentId}
                                    removeComment={removeComment.bind(null, id)}
                                    addComment={addComment.bind(null, id)}
                                    remove={removeArticle.bind(null, slug)}
                                    key={id}
                                    article={article}
                                />
                            );
                        },
                    )}
            </div>
        );
    }
}
