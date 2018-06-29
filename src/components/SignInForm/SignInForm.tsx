import React, { Component, createRef, RefObject } from 'react';
import Button from '../Button/Button';
import { ISignInRequest } from '../../interfaces';

export interface ISignInFormProps {
    signIn: (data: ISignInRequest) => any;
    loading: boolean;
}

export default class SignInForm extends Component<ISignInFormProps, any> {
    state = {
        email: '',
        password: '',
    };

    formRef: RefObject<HTMLFormElement> = createRef();

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    signIn = (event) => {
        event.preventDefault();

        if (this.formRef.current.checkValidity()) {
            this.props.signIn(this.state);
            // this.setState({ email: '', password: '' });
        }
    }

    render() {
        const { email, password } = this.state;
        const { loading } = this.props;

        return (
            <form ref={this.formRef} onSubmit={this.signIn}>

                <fieldset className='uk-fieldset'>

                    <legend className='uk-legend'>Sign In for additional options</legend>

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
                        placeholder={'Password'}
                        required={true}
                        value={password}
                        minLength={6}
                        onChange={this.handleChange}
                        name='password'
                        type='text'
                    />

                </fieldset>

                <Button type='submit' className='uk-button uk-button-primary' loading={loading}>
                    Sign In
                </Button>
            </form>
        );
    }
}
