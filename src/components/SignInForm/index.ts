import { connect } from 'react-redux';

import SignInForm from './SignInForm';
import { signIn } from '../../store/ducks';

export default connect((state: any) => ({
    loading: state.getIn(['auth', 'singingIn']),
}), { signIn })(SignInForm);
