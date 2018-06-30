import { fromJS } from 'immutable';

import { createReducer, http } from '../../utils';
import { IArticle, IArticlesResponse } from '../../interfaces';

import {
    ADD_ARTICLE_ERROR,
    ADD_ARTICLE_SUCCESS,
    ADD_COMMENT_ERROR,
    ADD_COMMENT_SUCCESS,
    LOADING_ARTICLES_ERROR,
    LOADING_ARTICLES_SUCCESS,
    REMOVE_ARTICLE_ERROR,
    REMOVE_ARTICLE_SUCCESS,
    REMOVE_COMMENT_ERROR,
    REMOVE_COMMENT_SUCCESS,
    START_ADD_ARTICLE,
    START_ADD_COMMENT,
    START_LOAD_ARTICLES,
    START_REMOVE_ARTICLE,
    START_REMOVE_COMMENT,
} from '../actionTypes';
import { env } from '../../../environment/environment';

// Action creators
export function startLoadArticles() {
    return { type: START_LOAD_ARTICLES };
}

export function loadingArticlesError(error: any) {
    return {
        type: LOADING_ARTICLES_ERROR,
        payload: error,
    };
}

export function loadingArticlesSuccess(response: IArticlesResponse) {
    return {
        type: LOADING_ARTICLES_SUCCESS,
        payload: response,
    };
}

export const loadArticles = () => dispatch => {

    dispatch(startLoadArticles());

    return http.get(env.api.articles.get)
        .then(
            (response: IArticlesResponse) => dispatch(loadingArticlesSuccess(response)),
            error => dispatch(loadingArticlesError(error)),
        );
};

export function startAddArticle() {
    return { type: START_ADD_ARTICLE };
}

export function addArticleError(error: any) {
    return {
        type: ADD_ARTICLE_ERROR,
        payload: error,
    };
}

export function addArticleSuccess() {
    return { type: ADD_ARTICLE_SUCCESS };
}

export const addArticle = ({ title, text, image }: Partial<IArticle>) => dispatch => {
    dispatch(startAddArticle());

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
            error => dispatch(addArticleError(error)),
        );
};

export const removeArticle = (slug: string) => dispatch => {

    dispatch(startRemoveArticle(slug));

    return http.delete(`${env.api.articles.remove}/${slug}`)
        .then(
            () => dispatch(removeArticleSuccess(slug)),
            error => dispatch(removeArticleError(error)),
        );
};

export function startRemoveArticle(articleId: string) {
    return {
        type: START_REMOVE_ARTICLE,
        payload: articleId,
    };
}

export function removeArticleError(error: any) {
    return {
        type: REMOVE_ARTICLE_ERROR,
        payload: error,
    };
}

export function removeArticleSuccess(slug: string) {
    return {
        type: REMOVE_ARTICLE_SUCCESS,
        payload: slug,
    };
}

export function startAddComment(articleId: string) {
    return {
        type: START_ADD_COMMENT,
        payload: articleId,
    };
}

export function addCommentSuccess() {
    return { type: ADD_COMMENT_SUCCESS };
}

export function addCommentError(error: any) {
    return {
        type: ADD_COMMENT_ERROR,
        payload: error,
    };
}

export const addComment = (article_id: string, comment: string) => dispatch => {

    dispatch(startAddComment(article_id));

    return http.post(env.api.comments.add, { comment, article_id })
        .then(
            () => {
                dispatch(loadArticles());
                dispatch(addCommentSuccess());
            },
            error => dispatch(addCommentError(error)),
        );
};

export function startRemoveComment(commentId: string) {
    return {
        type: START_REMOVE_COMMENT,
        payload: commentId,
    };
}

export function removeCommentSuccess(articleId: string, commentId: string) {
    return {
        type: REMOVE_COMMENT_SUCCESS,
        payload: { articleId, commentId },
    };
}

export function removeCommentError(error: any) {
    return {
        type: REMOVE_COMMENT_ERROR,
        payload: error,
    };
}

export const removeComment = (articleId: string, commentId: string) => dispatch => {

    dispatch(startRemoveComment(commentId));

    http.delete(`${env.api.comments.remove}/${commentId}`)
        .then(
            () => dispatch(removeCommentSuccess(articleId, commentId)),
            error => dispatch(removeCommentError(error)),
        );
};

// Reducer
const initialState = fromJS({
    articlesList: [],
    loadingArticles: false,
    errorLoadArticles: null,

    addingArticle: false,
    errorAddArticle: null,

    removingArticleId: null,
    errorRemoveArticle: null,

    addingCommentArticleId: null,
    errorAddComment: null,

    removingCommentId: null,
    errorRemoveComment: null,
});

const actionHandlers = {
    [START_LOAD_ARTICLES]: state => state.set('loadingArticles', true),
    [LOADING_ARTICLES_SUCCESS]: (state, { payload }) => state.merge({
        articlesList: fromJS(payload.items),
        errorLoadingArticles: null,
        loadArticles: false,
    }),
    [LOADING_ARTICLES_ERROR]: (state, { payload }) => state.merge({
        errorLoadingArticles: payload,
        loadArticles: false,
    }),
    [START_ADD_ARTICLE]: state => state.set('addingArticle', true),
    [ADD_ARTICLE_SUCCESS]: state => state.merge({
        addingArticle: false,
        errorAddArticle: null,
    }),
    [ADD_ARTICLE_ERROR]: (state, { payload }) => state.merge({
        addingArticle: false,
        errorAddArticle: payload,
    }),
    [START_REMOVE_ARTICLE]: (state, { payload }) => state.set('removingArticleId', payload),
    [REMOVE_ARTICLE_SUCCESS]: (state, { payload }) => state
        .set('removingArticleId', null)
        .set('errorRemoveArticle', null)
        .update(
            'articlesList',
            list => list.filter(article => article.get('slug') !== payload),
        ),
    [REMOVE_ARTICLE_ERROR]: (state, { payload }) => state.merge({
        removingArticleId: null,
        errorRemoveArticle: payload,
    }),
    [START_ADD_COMMENT]: (state, { payload }) => state.set('addingCommentArticleId', payload),
    [ADD_COMMENT_SUCCESS]: state => state.merge({
        addingCommentArticleId: null,
        errorRemoveComment: null,
    }),
    [ADD_COMMENT_ERROR]: (state, { payload }) => state.merge({
        addingCommentArticleId: null,
        errorRemoveComment: payload,
    }),
    [START_REMOVE_COMMENT]: (state, { payload }) => state.set('removingCommentId', payload),
    [REMOVE_COMMENT_SUCCESS]: (state, { payload: { articleId, commentId } }) => {
        return state
            .set('removingCommentId', null)
            .set('errorRemoveComment', null)
            .update(
                'articlesList',
                list => list.map(article => article.get('_id') === articleId
                    ? article.update(
                        'comments',
                        comments => comments.filter(comment => comment.get('id') !== commentId),
                    )
                    : article),
            );
    },
    [REMOVE_COMMENT_ERROR]: (state, { payload }) => state.merge({
        removingCommentId: null,
        errorRemoveComment: payload,
    }),
};

export const articlesReducer = createReducer(actionHandlers, initialState);
