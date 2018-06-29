import React, { SFC } from 'react';
import { If } from '../../utils';

export interface IAppHeaderProps {
    title: string;
    name: string;
    isLoggedIn: boolean;
    signOut: () => any;
}

const AppHeader: SFC<IAppHeaderProps> = ({ title, isLoggedIn, name, signOut }) => (
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
);

export default AppHeader;
