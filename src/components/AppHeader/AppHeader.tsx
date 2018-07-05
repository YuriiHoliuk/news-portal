import React, { Fragment, SFC } from 'react';
import { Link } from 'react-router-dom';

import { If } from '../../utils';

export interface IAppHeaderProps {
    title: string;
    name: string;
    isLoggedIn: boolean;
    signOut: () => any;
}

const AppHeader: SFC<IAppHeaderProps> = ({ title, isLoggedIn, name, signOut }) => (
    <Fragment>
        <div className='uk-flex uk-flex-between uk-flex-middle uk-margin-large-bottom'>
            <h1 className='uk-heading-primary uk-margin-remove-bottom'>
                {title}
            </h1>

            <If condition={isLoggedIn}>
                <span className='uk-margin-auto-left uk-margin-right'>{name}</span>
                <button
                    className='uk-button uk-button-secondary'
                    type='button'
                    onClick={signOut}
                >
                    Sign Out
                </button>
            </If>
        </div>

        <nav className='uk-navbar-container' uk-navbar=''>
            <div className='uk-navbar-left'>
                <ul className='uk-navbar-nav'>
                    <li><Link to='/'>Home</Link></li>

                    <If condition={!isLoggedIn}>
                        <li><Link to='/sign-in'>Sign In</Link></li>
                        <li><Link to='/sign-up'>Sign Up</Link></li>
                    </If>

                    <If condition={isLoggedIn}>
                        <li><Link to='/article/create'>Add Article</Link></li>
                    </If>
                </ul>
            </div>
        </nav>
    </Fragment>
);

export default AppHeader;
