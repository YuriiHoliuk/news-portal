import React, { SFC } from 'react';

const Textarea: SFC<any> = ({ input, placeholder, meta: { touched, error, submitting } }) => (
    <div className='uk-margin'>
        <textarea
            className={`uk-input ${(touched && error) ? 'uk-form-danger' : ''}`}
            placeholder={placeholder}
            readOnly={submitting}
            {...input}
        />
        {touched && error && <span className='uk-margin-small uk-text-danger'>{error}</span>}
    </div>
);

export default Textarea;
