import React, { Fragment, SFC } from 'react';

import { AppContext } from '../../../../containers/App';

export interface ICommentProps {
    text: string;
    openRemoveModal: () => void;
}

export const Comment: SFC<ICommentProps> = ({ text, openRemoveModal }) => (
    <Fragment>
        <li>{text}</li>

        <AppContext.Consumer>
            {({ proMode }) => proMode && (
                <button type='button' onClick={openRemoveModal}>Remove</button>
            )}
        </AppContext.Consumer>
    </Fragment>
);
