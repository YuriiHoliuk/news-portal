import AddArticleForm from './AddArticleForm';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addArticle } from '../../store/ducks';
import { reduxForm } from 'redux-form/immutable';
import { ADD_ARTICLE_FORM } from '../../constants/forms';

const connectHOC = connect((state: any) => ({
    loading: state.getIn(['articles', 'addingArticle']),
    error: state.getIn(['articles', 'addArticleError']),
}), { addArticle });

const formHOC = reduxForm({ form: ADD_ARTICLE_FORM });

export default compose(connectHOC, formHOC)(AddArticleForm);
