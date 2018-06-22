import React, { Component } from 'react';
import { List, Map } from 'immutable';

import Article from '../Article';

interface IArticlesListProps {
    articles: List<Map<string, any>>;
    loadArticles: () => any;
    removeArticle: (articleId: string) => any;
    removeComment: (articleId: string, commentId: string) => any;
    addComment: (articleId: string, text: string) => any;
}

export default class ArticlesList extends Component<any, any> {
    componentDidMount() {
        this.props.loadArticles();
    }

    render() {
        const { articles, removeComment, removeArticle, addComment } = this.props;

        return (
            <div className='uk-margin-xlarge-bottom'>
                {articles && articles
                    .map(article => {
                            const id = article.get('id');

                            return (
                                <Article
                                    removeComment={removeComment.bind(null, id)}
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
