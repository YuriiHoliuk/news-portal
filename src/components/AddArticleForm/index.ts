import AddArticleForm from './AddArticleForm';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addArticle } from '../../store/ducks';
import { reduxForm } from 'redux-form';
import { ADD_ARTICLE_FORM } from '../../constants/forms';

export default compose(connect((state: any) => ({
    loading: state.getIn(['articles', 'addingArticle']),
    error: state.getIn(['articles', 'addArticleError']),
}), { addArticle }), reduxForm({ form: ADD_ARTICLE_FORM }), AddArticleForm);
