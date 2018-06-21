import React, { Component } from 'react';
import { Map, List } from 'immutable';

import Article from '../Article';

interface IArticlesListProps {
    articles: List<Map<string, any>>;
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

        console.log('Component', articles);

        return (
            <div className={'uk-margin-xlarge-bottom'}>
                {articles && articles
                    .map(article => (
                            <Article
                                removeComment={removeComment.bind(null, article.get('id'))}
                                remove={removeArticle.bind(null, article.get('id'))}
                                key={article.get('id')}
                                article={article}
                            />
                        ),
                    )}
            </div>
        );
    }
}
