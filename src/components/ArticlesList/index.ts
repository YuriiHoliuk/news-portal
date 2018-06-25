import { connect } from 'react-redux';

import { addComment, loadArticles, removeArticle, removeComment } from '../../store/ducks';

import ArticlesList from './ArticlesList';

export default connect((state: any) => ({
    articles: state.get('articles').get('articlesList'),
    addingCommentArticleId: state.get('articles').get('addingCommentArticleId'),
    removingArticleId: state.get('articles').get('removingArticleId'),
    removingCommentId: state.get('articles').get('removingCommentId'),
}), {
    loadArticles,
    removeArticle,
    removeComment,
    addComment,
})(ArticlesList);
