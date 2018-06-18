import React, { Component } from 'react';

import { ArticleWithRemoveModal } from './components/Article';

import { IArticle } from '../../interfaces';

interface IArticlesListState {
    articles: IArticle[];
}

export class ArticlesList extends Component<{}, IArticlesListState> {
    state = {
        articles: null,
    };

    componentDidMount() {
        fetch('http://127.0.0.1:3000/articles')
            .then(response => response.json())
            .then((articles: IArticle[]) => this.setState(() => ({ articles })));
    }

    removeArticle = (articleId: string) => {
        this.setState((prevState: IArticlesListState) => {
            return {
                articles: prevState.articles.filter(({ id }) => id !== articleId),
            };
        });
    }

    removeComment = (articleId: string, commentId: string) => {
        this.setState((prevState: IArticlesListState) => {
            return {
                articles: prevState.articles.map((article: IArticle) => {
                    return articleId === article.id
                        ? {
                            ...article,
                            comments: article.comments.filter(({ id }) => id !== commentId),
                        }
                        : article;
                }),
            };
        });
    }

    render() {
        const { articles } = this.state;

        return articles && articles
            .map((article: IArticle) => (
                    <ArticleWithRemoveModal
                        removeComment={this.removeComment.bind(this, article.id)}
                        remove={this.removeArticle.bind(this, article.id)}
                        key={article.id}
                        article={article}
                    />
                ),
            );
    }
}
