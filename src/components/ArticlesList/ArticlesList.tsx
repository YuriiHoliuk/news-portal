import React, { Component } from 'react';
import { List, Map } from 'immutable';

import Article from '../Article';

interface IArticlesListProps {
    articles: List<Map<string, any>>;
    loadArticles: () => any;
    removeArticle: (articleId: string) => any;
    removeComment: (commentId: string) => any;
    addComment: (articleId: string, text: string) => any;
    addingCommentArticleId: string;
    removingArticleId: string;
    removingCommentId: string;
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
        } = this.props;

        return (
            <div className='uk-margin-xlarge-bottom'>
                {articles && articles
                    .map(article => {
                            const id = article.get('_id');

                            return (
                                <Article
                                    removing={id === removingArticleId}
                                    addingComment={id === addingCommentArticleId}
                                    removingCommentId={removingCommentId}
                                    removeComment={removeComment}
                                    addComment={addComment.bind(null, id)}
                                    remove={removeArticle.bind(null, id)}
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
