import { fromJS } from 'immutable';

import { createReducer, http } from '../../utils';
import { API_THUNK, IApiThunkAction } from '../middlewares';

import { IArticle, IArticlesResponse } from '../../interfaces';
import {
    ADD_ARTICLE,
    ADD_COMMENT,
    ERROR,
    LOAD_ARTICLES,
    REMOVE_ARTICLE,
    REMOVE_COMMENT,
    START,
    SUCCESS,
} from '../actionTypes';

import { env } from '../../../environment/environment';

// Action creators
export const loadArticles = (): IApiThunkAction => {
    return {
        [API_THUNK]: {
            request: () => http.get(env.api.articles.get),
            onStart: [LOAD_ARTICLES + START],
            onSuccess: [LOAD_ARTICLES + SUCCESS],
            onError: [LOAD_ARTICLES + ERROR],
        },
    };
};

export const addArticle = ({ title, text, image }: Partial<IArticle>): IApiThunkAction => {
    let newArticle: Partial<IArticle> = { title, text };

    if (image) {
        newArticle = { ...newArticle, image };
    }

    return {
        [API_THUNK]: {
            request: () => http.post(env.api.articles.add, newArticle),
            onStart: [ADD_ARTICLE + START],
            onSuccess: [ADD_ARTICLE + SUCCESS, loadArticles],
            onError: [ADD_ARTICLE + ERROR],
        },
    };
};

export const removeArticleSuccess = (slug: string) => () => {
    return {
        type: REMOVE_ARTICLE + SUCCESS,
        payload: slug,
    };
};

export const removeArticle = (slug: string): IApiThunkAction => {
    return {
        [API_THUNK]: {
            request: () => http.delete(`${env.api.articles.remove}/${slug}`),
            onStart: [REMOVE_ARTICLE + START],
            onSuccess: [removeArticleSuccess(slug)],
            onError: [REMOVE_ARTICLE + ERROR],
        },
    };
};

export const addComment = (article_id: string, comment: string): IApiThunkAction => {
    return {
        [API_THUNK]: {
            request: () => http.post(env.api.comments.add, { comment, article_id }),
            onStart: [ADD_COMMENT + START],
            onSuccess: [ADD_COMMENT + SUCCESS, loadArticles],
            onError: [ADD_COMMENT + ERROR],
        },
    };
};

export const removeCommentSuccess = (articleId: string, commentId: string) => () => {
    return {
        type: REMOVE_COMMENT + SUCCESS,
        payload: { articleId, commentId },
    };
};

export const removeComment = (articleId: string, commentId: string): IApiThunkAction => {
    return {
        [API_THUNK]: {
            request: () => http.delete(`${env.api.comments.remove}/${commentId}`),
            onStart: [REMOVE_COMMENT + START],
            onSuccess: [removeCommentSuccess(articleId, commentId)],
            onError: [REMOVE_COMMENT + ERROR],
        },
    };
};

// Reducer
const initialState = fromJS({
    articlesList: [],

    loadingArticles: false,
    addingArticle: false,

    removingArticleId: null,
    addingCommentArticleId: null,
    removingCommentId: null,

    addArticleError: null,
    error: null,
});

const actionHandlers = {
    [LOAD_ARTICLES + START]: state => state.set('loadingArticles', true),
    [LOAD_ARTICLES + SUCCESS]: (state, { payload }: { payload: IArticlesResponse }) => state.merge({
        loadingArticles: false,
        error: null,
        articlesList: fromJS(payload.items),
    }),
    [LOAD_ARTICLES + ERROR]: (state, { payload }) => state.merge({
        loadingArticles: false,
        error: payload,
    }),
    [ADD_ARTICLE + START]: state => state.set('addingArticle', true),
    [ADD_ARTICLE + SUCCESS]: state => state.merge({
        addingArticle: false,
        addArticleError: null,
    }),
    [ADD_ARTICLE + ERROR]: (state, { payload }) => state.merge({
        addingArticle: false,
        addArticleError: payload,
    }),
    [REMOVE_ARTICLE + START]: (state, { payload }) => state.set('removingArticleId', payload),
    [REMOVE_ARTICLE + SUCCESS]: (state, { payload }) => state
        .merge({ removingArticleId: null, error: null })
        .update(
            'articlesList',
            list => list.filter(article => article.get('slug') !== payload),
        ),
    [REMOVE_ARTICLE + ERROR]: (state, { payload }) => state.merge({
        removingArticleId: null,
        error: payload,
    }),
    [ADD_COMMENT + START]: (state, { payload }) => state.set('addingCommentArticleId', payload),
    [ADD_COMMENT + SUCCESS]: state => state.merge({
        addingCommentArticleId: null,
        error: null,
    }),
    [ADD_COMMENT + ERROR]: (state, { payload }) => state.merge({
        addingCommentArticleId: null,
        error: payload,
    }),
    [REMOVE_COMMENT + START]: (state, { payload }) => state.set('removingCommentId', payload),
    [REMOVE_COMMENT + SUCCESS]: (state, { payload: { articleId, commentId } }) => state
        .merge({ removingCommentId: null, error: null })
        .update(
            'articlesList',
            list => list.map(article => article.get('_id') === articleId
                ? article.update(
                    'comments',
                    comments => comments.filter(comment => comment.get('id') !== commentId),
                )
                : article),
        ),
    [REMOVE_COMMENT + ERROR]: (state, { payload }) => state.merge({
        removingCommentId: null,
        error: payload,
    }),
};

export const articlesReducer = createReducer(actionHandlers, initialState);
