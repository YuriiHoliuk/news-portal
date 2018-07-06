import React, { Component, createRef, RefObject, SyntheticEvent } from 'react';
import { Map } from 'immutable';

import { IUpdateArticleData } from '../../interfaces';
import Button from '../Button';
import { If } from '../../utils';

export interface IAddArticleFormProps {
    loading: boolean;
    error: string;
    history: any;
    match: any;
    article: Map<any, any>;
    loadArticle: (slug: string) => any;
    editArticle: (slug: string, data: IUpdateArticleData) => any;
}

export default class EditArticleForm extends Component<IAddArticleFormProps, any> {
    state: IUpdateArticleData = {
        title: '',
        text: '',
        image: '',
        // publicatedAt: '',
        // isPublished: true,
    };

    slug: string;

    formRef: RefObject<HTMLFormElement> = createRef();

    componentDidMount() {
        this.props.article
            ? this.setArticle()
            : this.props.loadArticle(this.props.match.params.slug);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.article && this.props.article) {
            this.setArticle();
        }
    }

    setArticle() {
        const { article } = this.props;

        const title = article.get('title');
        const text = article.get('text');
        const image = article.get('image');

        this.setState({ title, text, image });
    }

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    editArticle = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { editArticle, history, article } = this.props;

        if (this.formRef.current.checkValidity()) {
            editArticle(article.get('slug'), this.state);
            history.push('/');
        }
    }

    render() {
        const { title, text, image } = this.state;
        const { loading, error, article } = this.props;

        return article ? (
            <form onSubmit={this.editArticle} ref={this.formRef}>

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
                    Edit Article
                </Button>
            </form>
        ) : <div>Loading Article data...</div>;
    }
}
