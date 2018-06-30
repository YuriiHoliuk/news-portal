import AddArticleForm from './AddArticleForm';
import { connect } from 'react-redux';
import { addArticle } from '../../store/ducks';

export default connect((state: any) => ({
    loading: state.getIn(['articles', 'addingArticle']),
    error: state.getIn(['articles', 'addArticleError']),
}), { addArticle })(AddArticleForm);
