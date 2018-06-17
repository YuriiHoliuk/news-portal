import React, {Component} from 'react';
import {IArticle} from '../../interfaces';
import { ArticleWithRemoveModal } from './components/Article';


interface IArticleState {
    articles: IArticle[];
}

export class ArticlesList extends Component<{}, IArticleState> {
    state = {
        articles: null,
    };

    componentDidMount() {
        fetch('http://127.0.0.1:3000/articles')
            .then(response => response.json())
            .then((articles: IArticle[]) => this.setState(() => ({articles})));
    }

    render() {
        const {articles} = this.state;

        return articles && articles
            .map((article: IArticle) => <ArticleWithRemoveModal key={article.id} article={article}/>);
    }
}
