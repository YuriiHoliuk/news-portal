import React, { Component, createRef, RefObject, SyntheticEvent } from 'react';

import { IArticle } from '../../interfaces';
import Button from '../Button';
import { If } from '../../utils';

export interface IAddArticleFormProps {
    addArticle: (newArticle: Partial<IArticle>) => any;
    loading: boolean;
    error: string;
}

export default class AddArticleForm extends Component<IAddArticleFormProps, any> {
    state = {
        title: '',
        text: '',
        image: '',
    };

    formRef: RefObject<HTMLFormElement> = createRef();

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    addArticle = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (this.formRef.current.checkValidity()) {
            this.props.addArticle(this.state);
            this.setState({ title: '', text: '', image: '' });
        }
    }

    render() {
        const { title, text, image } = this.state;
        const { loading, error } = this.props;

        return (
            <form onSubmit={this.addArticle} ref={this.formRef}>

                <fieldset className='uk-fieldset'>

                    <legend className='uk-legend'>Add new Article</legend>

                    <If condition={!!error}>
                        <p className='uk-alert-danger' uk-alert=''>{error}</p>
                    </If>

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

                    <input
                        className='uk-input uk-margin'
                        placeholder={'Image'}
                        value={image}
                        onChange={this.handleChange}
                        name='image'
                        type='text'
                    />

                </fieldset>

                <Button type='submit' className='uk-button uk-button-primary' loading={loading}>
                    Add Article
                </Button>
            </form>
        );
    }
}
