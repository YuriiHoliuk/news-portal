import PublicRoute from './PublicRoute';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../store/ducks';

export default connect((state: any) => ({ isLoggedIn: isLoggedIn(state) }))(PublicRoute);
