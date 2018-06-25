import React, { Component, createRef, RefObject } from 'react';
import Button from '../Button';

export interface IAddCommentFormProps {
    addComment: (text: string) => void;
    loading: boolean;
}

export default class AddCommentForm extends Component<IAddCommentFormProps, any> {

    state = {
        newCommentText: '',
    };

    formRef: RefObject<HTMLFormElement> = createRef();

    addComment = (event) => {
        event.preventDefault();

        if (this.formRef.current.checkValidity()) {
            this.props.addComment(this.state.newCommentText);
            this.setState({ newCommentText: '' });
        }
    }

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    render() {
        const { newCommentText } = this.state;
        const { loading } = this.props;

        return (
            <form className='uk-flex' ref={this.formRef} onSubmit={this.addComment}>

                <fieldset className='uk-fieldset uk-margin-small-right'>
                    <input
                        className='uk-input uk-form-small'
                        type='text'
                        name='newCommentText'
                        required={true}
                        value={newCommentText}
                        onChange={this.handleChange}
                    />
                </fieldset>

                <Button
                    loading={loading}
                    spinnerSize={0.5}
                    type='submit'
                    className='uk-button uk-button-primary uk-button-small'
                >
                    Add Comment
                </Button>

            </form>
        );
    }
}
