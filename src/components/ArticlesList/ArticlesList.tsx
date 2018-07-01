import React, { Component } from 'react';
import { List, Map } from 'immutable';

import { If } from '../../utils';

import Article from '../Article';
import Pagination from '../Pagination';

import { IPaginationInfo } from '../../interfaces';

interface IArticlesListProps {
    articles: List<Map<string, any>>;
    loadArticles: (page?: number) => any;
    removeArticle: (articleId: string) => any;
    removeComment: (commentId: string) => any;
    addComment: (articleId: string, text: string) => any;
    addingCommentArticleId: string;
    removingArticleId: string;
    removingCommentId: string;
    error: string;
    pagination: IPaginationInfo;
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
            pagination,
            loadArticles,
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

                {!!pagination && <div className='uk-flex uk-flex-center uk-width-1-1'>
                    <Pagination changePage={loadArticles} {...pagination} />
                </div>}
            </div>
        );
    }
}
