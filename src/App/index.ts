import App from './App';
import { connect } from 'react-redux';
import { isLoggedIn, accountSelector, signOut, getAccount, tokenSelector } from '../store/ducks';

export default connect((state: any) => ({
    isLoggedIn: isLoggedIn(state),
    account: accountSelector(state),
    token: tokenSelector(state),
}), { signOut, getAccount })(App);
