import React, { SFC } from 'react';

import AppContext from '../../App/AppContext';
import Button from '../Button';

export interface ICommentProps {
    text: string;
    remove: () => void;
    removing: boolean;
}

const Comment: SFC<ICommentProps> = ({ text, remove, removing }) => (
    <li className='uk-margin'>
        <p className='uk-margin-remove'>{text}</p>

        <AppContext.Consumer>
            {({ proMode }) => proMode && (
                <Button
                    loading={removing}
                    spinnerSize={0.5}
                    className='uk-button uk-button-danger uk-button-small'
                    onClick={remove}
                >
                    Remove
                </Button>
            )}
        </AppContext.Consumer>
    </li>
);

export default Comment;
