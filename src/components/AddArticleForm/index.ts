import AddArticleForm from './AddArticleForm';
import { connect } from 'react-redux';
import { addArticle } from '../../store/ducks';

export default connect((state: any) => ({
    loading: state.get('articles').get('addingArticle'),
}), { addArticle })(AddArticleForm);
