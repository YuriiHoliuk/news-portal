import { fromJS } from 'immutable';

import { createReducer, http } from '../../utils';
import { API_THUNK, IApiThunkAction } from '../middlewares';

import { IArticle, IUpdateArticleData } from '../../interfaces';
import { ERROR, START, SUCCESS, LOAD_ARTICLE, EDIT_ARTICLE } from '../actionTypes';

import { env } from '../../../environment/environment';

// Action creators
export const loadArticle = (slug: string): IApiThunkAction => {
    return {
        [API_THUNK]: {
            request: () => http.get(`${env.api.articles.get}/${slug}`).then(res => res.data[0]),
            onStart: [LOAD_ARTICLE + START],
            onSuccess: [LOAD_ARTICLE + SUCCESS],
            onError: [LOAD_ARTICLE + ERROR],
        },
    };
};

export const editArticle = (slug: string, { title, text, image }: IUpdateArticleData): IApiThunkAction => {
    let updatedArticle: Partial<IArticle> = { title, text };

    if (image) {
        updatedArticle = { ...updatedArticle, image };
    }
    return {
        [API_THUNK]: {
            request: () => http.put(`${env.api.articles.update}/${slug}`, updatedArticle),
            onStart: [EDIT_ARTICLE + START],
            onSuccess: [EDIT_ARTICLE + SUCCESS],
            onError: [EDIT_ARTICLE + ERROR],
        },
    };
};

// Reducer
const initialState = fromJS({
    article: null,

    loading: false,
    error: null,

    editingArticle: false,
    editArticleError: null,
});

const actionHandlers = {
    [LOAD_ARTICLE + START]: state => state.set('loading', true),
    [LOAD_ARTICLE + SUCCESS]: (state, { payload }: { payload: IArticle }) => {
        return state.merge({
            loading: false,
            error: null,
            article: fromJS(payload),
        });
    },
    [LOAD_ARTICLE + ERROR]: (state, { payload }) => state.merge({
        loading: false,
        error: payload,
    }),
    [EDIT_ARTICLE + START]: state => state.set('editingArticle', true),
    [EDIT_ARTICLE + SUCCESS]: state => {
        return state.merge({
            editingArticle: false,
            editArticleError: null,
        });
    },
    [EDIT_ARTICLE + ERROR]: (state, { payload }) => state.merge({
        editingArticle: false,
        editArticleError: payload,
    }),
};

export const articleReducer = createReducer(actionHandlers, initialState);
