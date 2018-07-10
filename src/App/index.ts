import App from './App';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isLoggedIn, accountSelector, signOut, getAccount, tokenSelector } from '../store/ducks';

export default withRouter(connect((state: any) => ({
    isLoggedIn: isLoggedIn(state),
    account: accountSelector(state),
    token: tokenSelector(state),
}), { signOut, getAccount })(App) as any);
