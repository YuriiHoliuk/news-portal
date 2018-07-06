import EditArticleForm from './EditArticleForm';
import { connect } from 'react-redux';
import { editArticle, loadArticle } from '../../store/ducks';

export default connect((state: any) => ({
    loading: state.getIn(['article', 'editingArticle']),
    error: state.getIn(['article', 'editArticleError']),
    article: state.getIn(['article', 'article']),
}), { editArticle, loadArticle })(EditArticleForm);
