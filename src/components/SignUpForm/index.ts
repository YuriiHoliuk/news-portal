import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';
import { signUp } from '../../store/ducks';

export default connect((state: any) => ({
    loading: state.getIn(['auth', 'singingUp']),
}), { signUp })(SignUpForm);
