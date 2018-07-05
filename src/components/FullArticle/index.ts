import FullArticle from './FullArticle';
import { withRemoveModal } from '../../hocs';
import { connect } from 'react-redux';
import { addComment, loadArticle, removeArticle, removeComment } from '../../store/ducks';

export default connect((state: any, props: any) => ({
    addingCommentArticleId: state.getIn(['articles', 'addingCommentArticleId']),
    removingArticleId: state.getIn(['articles', 'removingArticleId']),
    removingCommentId: state.getIn(['articles', 'removingCommentId']),
    error: state.getIn(['article', 'error']) || state.getIn(['articles', 'error']),
    // article: state.getIn(['article', 'article']),
    article: state.getIn(['articles', 'articlesList'])
        .find(article => props.match.params.slug === article.get('slug')),
}), {
    removeArticle,
    removeComment,
    addComment,
    loadArticle,
})(withRemoveModal(FullArticle, 'removeArticle'));
