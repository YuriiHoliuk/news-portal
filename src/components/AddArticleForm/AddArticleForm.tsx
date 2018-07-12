import React, { Component } from 'react';

import { IArticle } from '../../interfaces';
import Button from '../Button';
import { Field } from 'redux-form';
// import Input from '../Input';
// import Textarea from '../Textarea';

export interface IAddArticleFormProps {
    addArticle: (newArticle: Partial<IArticle>) => any;
    history: any;
    handleSubmit: (...args) => () => any;
    pristine: boolean;
    reset: () => any;
    submitting: boolean;
}

export default class AddArticleForm extends Component<IAddArticleFormProps, any> {
    addArticle = data => {
        const { addArticle, history } = this.props;

        return addArticle(data)
            .then((res) => {
                history.push('/');
                return res;
            });
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.addArticle)}>

                <fieldset className='uk-fieldset'>

                    <legend className='uk-legend'>Add new Article</legend>

                    <Field
                        placeholder='Title'
                        component={'input'}
                        name='title'
                        type='text'
                    />

                    <Field
                        placeholder='Text'
                        component={'textarea'}
                        name='text'
                    />

                    <Field
                        placeholder='Image'
                        name='image'
                        type='text'
                        component={'input'}
                    />

                </fieldset>

                <Button type='submit' className='uk-button uk-button-primary' loading={submitting}>
                    Add Article
                </Button>
            </form>
        );
    }
}
