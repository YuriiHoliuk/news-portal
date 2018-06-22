import AddArticleForm from './AddArticleForm';
import { connect } from 'react-redux';
import { addArticle } from '../../store/ducks';

export default connect(null, { addArticle })(AddArticleForm);
