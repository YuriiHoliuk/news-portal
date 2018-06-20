import React, { Component } from 'react';

import Article from '../Article';

import { IArticle } from '../../interfaces';

interface IArticlesListProps {
    articles: IArticle[];
    loadArticles: () => any;
    removeArticle: (articleId: string) => any;
    removeComment: (articleId: string, commentId: string) => any;
}

export default class ArticlesList extends Component<IArticlesListProps, {}> {
    componentDidMount() {
        this.props.loadArticles();
    }

    render() {
        const { articles, removeComment, removeArticle } = this.props;

        return (
            <div className={'uk-margin-xlarge-bottom'}>
                {articles && articles
                    .map((article: IArticle) => (
                            <Article
                                removeComment={removeComment.bind(null, article.id)}
                                remove={removeArticle.bind(null, article.id)}
                                key={article.id}
                                article={article}
                            />
                        ),
                    )}
            </div>
        );
    }
}
