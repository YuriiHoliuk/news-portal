import AddArticleForm from './AddArticleForm';
import { connect } from 'react-redux';
import { addArticle } from '../../ducks/articlesDuck';

export default connect(null, { addArticle })(AddArticleForm);
