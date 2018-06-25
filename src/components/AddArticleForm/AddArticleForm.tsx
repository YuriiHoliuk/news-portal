import React, { Component, createRef, RefObject, SyntheticEvent } from 'react';

import { IArticle } from '../../interfaces';
import Button from '../Button';

export interface IAddArticleFormProps {
    addArticle: (newArticle: Partial<IArticle>) => any;
    loading: boolean;
}

export default class AddArticleForm extends Component<IAddArticleFormProps, any> {
    state = {
        title: '',
        text: '',
    };

    formRef: RefObject<HTMLFormElement> = createRef();

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    addArticle = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (this.formRef.current.checkValidity()) {
            this.props.addArticle(this.state);
            this.setState({ title: '', text: '' });
        }
    }

    render() {
        const { title, text } = this.state;
        const { loading } = this.props;

        return (
            <form onSubmit={this.addArticle} ref={this.formRef}>

                <fieldset className='uk-fieldset'>

                    <legend className='uk-legend'>Add new Article</legend>

                    <input
                        className='uk-input uk-margin'
                        placeholder={'Title'}
                        required={true}
                        value={title}
                        onChange={this.handleChange}
                        name='title'
                        type='text'
                    />

                    <textarea
                        className='uk-textarea uk-margin'
                        placeholder={'Text'}
                        required={true}
                        id={'text'}
                        value={text}
                        onChange={this.handleChange}
                        name='text'
                    />

                </fieldset>

                <Button type='submit' className='uk-button uk-button-primary' loading={loading}>
                    Add Article
                </Button>
            </form>
        );
    }
}
