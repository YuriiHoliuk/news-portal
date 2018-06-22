import React from 'react';

import AppContext from '../../App/AppContext';

const AppHeader = ({ title }) => (
    <AppContext.Consumer>
        {({ proMode, toggleProMode }) => (
            <div className='uk-flex uk-flex-between uk-flex-middle uk-margin-large-bottom'>
                <h1 className='uk-heading-primary uk-margin-remove-bottom'>
                    {title}
                </h1>

                <button
                    className='uk-button uk-button-secondary'
                    type='button'
                    onClick={toggleProMode}
                >
                    {proMode ? 'Off' : 'On'} Pro Mode
                </button>
            </div>
        )}
    </AppContext.Consumer>
);

export default AppHeader;
