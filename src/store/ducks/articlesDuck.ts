import { fromJS } from 'immutable';

import { createReducer, http } from '../../utils';

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
export function loadArticlesStart() {
    return { type: LOAD_ARTICLES + START };
}

export function loadArticlesSuccess(response: IArticlesResponse) {
    return {
        type: LOAD_ARTICLES + SUCCESS,
        payload: response,
    };
}

export function loadArticlesError(error: any) {
    return {
        type: LOAD_ARTICLES + ERROR,
        payload: error,
    };
}

export const loadArticles = () => dispatch => {

    dispatch(loadArticlesStart());

    return http.get(env.api.articles.get)
        .then(
            (response: IArticlesResponse) => dispatch(loadArticlesSuccess(response)),
            error => dispatch(loadArticlesError(error.message)),
        );
};

export function addArticleStart() {
    return { type: ADD_ARTICLE + START };
}

export function addArticleSuccess() {
    return { type: ADD_ARTICLE + SUCCESS };
}

export function addArticleError(error: any) {
    return {
        type: ADD_ARTICLE + ERROR,
        payload: error,
    };
}

export const addArticle = ({ title, text, image }: Partial<IArticle>) => dispatch => {
    dispatch(addArticleStart());

    let newArticle: Partial<IArticle> = { title, text };

    if (image) {
        newArticle = { ...newArticle, image };
    }

    return http.post(env.api.articles.add, newArticle)
        .then(
            () => {
                dispatch(loadArticles());
                dispatch(addArticleSuccess());
            },
            error => dispatch(addArticleError(error.message)),
        );
};

export function removeArticleStart(articleId: string) {
    return {
        type: REMOVE_ARTICLE + START,
        payload: articleId,
    };
}

export function removeArticleSuccess(slug: string) {
    return {
        type: REMOVE_ARTICLE + SUCCESS,
        payload: slug,
    };
}

export function removeArticleError(error: any) {
    return {
        type: REMOVE_ARTICLE + ERROR,
        payload: error,
    };
}

export const removeArticle = (slug: string) => dispatch => {

    dispatch(removeArticleStart(slug));

    return http.delete(`${env.api.articles.remove}/${slug}`)
        .then(
            () => dispatch(removeArticleSuccess(slug)),
            error => dispatch(removeArticleError(error.message)),
        );
};

export function addCommentStart(articleId: string) {
    return {
        type: ADD_COMMENT + START,
        payload: articleId,
    };
}

export function addCommentSuccess() {
    return { type: ADD_COMMENT + SUCCESS };
}

export function addCommentError(error: any) {
    return {
        type: ADD_COMMENT + ERROR,
        payload: error,
    };
}

export const addComment = (article_id: string, comment: string) => dispatch => {

    dispatch(addCommentStart(article_id));

    return http.post(env.api.comments.add, { comment, article_id })
        .then(
            () => {
                dispatch(loadArticles());
                dispatch(addCommentSuccess());
            },
            error => dispatch(addCommentError(error.message)),
        );
};

export function removeCommentStart(commentId: string) {
    return {
        type: REMOVE_COMMENT + START,
        payload: commentId,
    };
}

export function removeCommentSuccess(articleId: string, commentId: string) {
    return {
        type: REMOVE_COMMENT + SUCCESS,
        payload: { articleId, commentId },
    };
}

export function removeCommentError(error: any) {
    return {
        type: REMOVE_COMMENT + ERROR,
        payload: error,
    };
}

export const removeComment = (articleId: string, commentId: string) => dispatch => {

    dispatch(removeCommentStart(commentId));

    http.delete(`${env.api.comments.remove}/${commentId}`)
        .then(
            () => dispatch(removeCommentSuccess(articleId, commentId)),
            error => dispatch(removeCommentError(error.message)),
        );
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
    [LOAD_ARTICLES + SUCCESS]: (state, { payload }) => state.merge({
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
