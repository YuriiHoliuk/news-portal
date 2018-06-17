import React, { Fragment } from 'react';

export const Comment = ({ text, openRemoveModal }) => (
    <Fragment>
        <li>{text}</li>
        <button type='button' onClick={openRemoveModal}>Remove</button>
    </Fragment>
);
