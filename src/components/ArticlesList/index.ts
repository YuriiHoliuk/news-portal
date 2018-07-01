import { connect } from 'react-redux';

import { addComment, loadArticles, paginationInfo, removeArticle, removeComment } from '../../store/ducks';

import ArticlesList from './ArticlesList';

export default connect((state: any) => ({
    articles: state.getIn(['articles', 'articlesList']),
    addingCommentArticleId: state.getIn(['articles', 'addingCommentArticleId']),
    removingArticleId: state.getIn(['articles', 'removingArticleId']),
    removingCommentId: state.getIn(['articles', 'removingCommentId']),
    error: state.getIn(['articles', 'error']),
    pagination: paginationInfo(state),
}), {
    loadArticles,
    removeArticle,
    removeComment,
    addComment,
})(ArticlesList);
