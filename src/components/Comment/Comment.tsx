import React, { Fragment, SFC } from 'react';

import AppContext from '../../App/AppContext';

export interface ICommentProps {
    text: string;
    remove: () => void;
}

const Comment: SFC<ICommentProps> = ({ text, remove }) => (
    <Fragment>
        <li>{text}</li>

        <AppContext.Consumer>
            {({ proMode }) => proMode && (
                <button type='button' onClick={remove}>Remove</button>
            )}
        </AppContext.Consumer>
    </Fragment>
);

export default Comment;
