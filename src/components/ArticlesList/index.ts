import { connect } from 'react-redux';

import { addComment, loadArticles, removeArticle, removeComment } from '../../store/ducks';

import ArticlesList from './ArticlesList';

export default connect((state: any) => ({
    articles: state.getIn(['articles', 'articlesList']),
    addingCommentArticleId: state.getIn(['articles', 'addingCommentArticleId']),
    removingArticleId: state.getIn(['articles', 'removingArticleId']),
    removingCommentId: state.getIn(['articles', 'removingCommentId']),
    error: state.getIn(['articles', 'error']),
}), {
    loadArticles,
    removeArticle,
    removeComment,
    addComment,
})(ArticlesList);
