import React, { SFC } from 'react';

import AppContext from '../../App/AppContext';

export interface ICommentProps {
    text: string;
    remove: () => void;
}

const Comment: SFC<ICommentProps> = ({ text, remove }) => (
    <li className='uk-margin'>
        <p className='uk-margin-remove'>{text}</p>

        <AppContext.Consumer>
            {({ proMode }) => proMode && (
                <button
                    className='uk-button uk-button-danger uk-button-small'
                    type='button'
                    onClick={remove}
                >
                    Remove
                </button>
            )}
        </AppContext.Consumer>
    </li>
);

export default Comment;
