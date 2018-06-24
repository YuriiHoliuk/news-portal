import React, { Component, createRef, RefObject } from 'react';
import Button from '../Button/Button';
import { ISignUpRequest } from '../../interfaces';
import { If } from '../../utils';

export interface ISignUpFormProps {
    signUp: (data: ISignUpRequest) => any;
    loading: boolean;
    error: string;
}

export default class SignUpForm extends Component<ISignUpFormProps, any> {
    state = {
        email: '',
        name: '',
        password: '',
        confirm_password: '',
    };

    formRef: RefObject<HTMLFormElement> = createRef();

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    signUp = (event) => {
        event.preventDefault();

        if (this.formRef.current.checkValidity()) {
            this.props.signUp(this.state);
            // this.setState({ email: '', name: '', password: '', password_confirm: '' });
        }
    }

    render() {
        const { email, name, password, confirm_password } = this.state;
        const { loading, error } = this.props;

        return (
            <form ref={this.formRef} onSubmit={this.signUp}>

                <fieldset className='uk-fieldset'>

                    <legend className='uk-legend'>Do not have an account?</legend>

                    <If condition={!!error}>
                        <p className='uk-alert-danger' uk-alert=''>{error}</p>
                    </If>

                    <input
                        className='uk-input uk-margin'
                        placeholder={'Email'}
                        required={true}
                        value={email}
                        onChange={this.handleChange}
                        name='email'
                        type='email'
                    />

                    <input
                        className='uk-input uk-margin'
                        placeholder={'Name'}
                        required={true}
                        value={name}
                        onChange={this.handleChange}
                        minLength={2}
                        name='name'
                        type='text'
                    />

                    <input
                        className='uk-input uk-margin'
                        placeholder={'Password'}
                        required={true}
                        value={password}
                        onChange={this.handleChange}
                        minLength={6}
                        name='password'
                        type='text'
                    />

                    <input
                        className='uk-input uk-margin'
                        placeholder={'Confirm Password'}
                        required={true}
                        value={confirm_password}
                        onChange={this.handleChange}
                        minLength={6}
                        name='confirm_password'
                        type='text'
                    />

                </fieldset>

                <Button type='submit' className='uk-button uk-button-primary' loading={loading}>
                    Sign Up
                </Button>
            </form>
        );
    }
}
