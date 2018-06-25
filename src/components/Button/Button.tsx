import React, { SFC } from 'react';

export interface IButtonProps {
    children: any;
    type?: string;
    disabled?: boolean;
    className?: string;
    loading?: boolean;
    spinnerSize?: number;
    onClick?: (event: any) => any;
}

const Button: SFC<IButtonProps> = ({
                                       loading,
                                       children,
                                       type = 'button',
                                       disabled = false,
                                       className = '',
                                       spinnerSize = 1,
                                       onClick = () => null,
                                   }) => (
    <button className={className} disabled={disabled} type={type} onClick={onClick}>
        {children}
        {loading && <span className='uk-margin-small-left' uk-spinner={`ratio: ${spinnerSize}`}/>}
    </button>
);

export default Button;
