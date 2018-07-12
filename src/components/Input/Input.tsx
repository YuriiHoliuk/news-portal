import React, { SFC } from 'react';

const Input: SFC<any> = ({ input, type, placeholder, meta: { touched, error, submitting } }) => (
    <div className='uk-margin'>
        <input
            className={`uk-input ${(touched && error) ? 'uk-form-danger' : ''}`}
            placeholder={placeholder}
            readOnly={submitting}
            type={type}
            {...input}
        />
        {touched && error && <span className='uk-margin-small uk-text-danger'>{error}</span>}
    </div>
);

export default Input;
