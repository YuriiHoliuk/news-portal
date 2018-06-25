import { fromJS, List } from 'immutable';

import { createReducer, http } from '../../utils';
import { IArticle, IComment } from '../../interfaces';

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
import { API } from '../../api';

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

export function loadingArticlesSuccess(articlesList: IArticle[]) {
    return {
        type: LOADING_ARTICLES_SUCCESS,
        payload: articlesList,
    };
}

export const loadArticles = () => dispatch => {

    dispatch(startLoadArticles());

    return http.get(API.articles)
        .then(
            (articlesList: IArticle[]) => dispatch(loadingArticlesSuccess(articlesList)),
            error => dispatch(loadingArticlesError(error)),
        );
};

export function startAddArticle(newArticle: Partial<IArticle>) {
    return {
        type: START_ADD_ARTICLE,
        payload: newArticle,
    };
}

export function addArticleError(error: any) {
    return {
        type: ADD_ARTICLE_ERROR,
        payload: error,
    };
}

export function addArticleSuccess(article: IArticle) {
    return {
        type: ADD_ARTICLE_SUCCESS,
        payload: article,
    };
}

export const addArticle = (newArticle: Partial<IArticle>) => dispatch => {
    dispatch(startAddArticle(newArticle));

    return http.post(API.articles, newArticle)
        .then(
            (addedArticle: IArticle) => dispatch(addArticleSuccess(addedArticle)),
            error => dispatch(addArticleError(error)),
        );
};

export const removeArticle = (articleId: string) => dispatch => {

    dispatch(startRemoveArticle(articleId));

    return http.delete(`${API.articles}/${articleId}`)
        .then(
            (article: IArticle) => dispatch(removeArticleSuccess(article)),
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

export function removeArticleSuccess(article: IArticle) {
    return {
        type: REMOVE_ARTICLE_SUCCESS,
        payload: article,
    };
}

export function startAddComment(articleId: string, text: string) {
    return {
        type: START_ADD_COMMENT,
        payload: { articleId, text },
    };
}

export function addCommentSuccess(comment: IComment) {
    return {
        type: ADD_COMMENT_SUCCESS,
        payload: comment,
    };
}

export function addCommentError(error: any) {
    return {
        type: ADD_COMMENT_ERROR,
        payload: error,
    };
}

export const addComment = (articleId: string, text: string) => dispatch => {

    dispatch(startAddComment(articleId, text));

    return http.post(API.comments, { text }, { articleId })
        .then(
            (comment: IComment) => dispatch(addCommentSuccess(comment)),
            error => dispatch(addCommentError(error)),
        );
};

export function startRemoveComment(commentId: string) {
    return {
        type: START_REMOVE_COMMENT,
        payload: commentId,
    };
}

export function removeCommentSuccess(comment: IComment) {
    return {
        type: REMOVE_COMMENT_SUCCESS,
        payload: comment,
    };
}

export function removeCommentError(error: any) {
    return {
        type: REMOVE_COMMENT_ERROR,
        payload: error,
    };
}

export const removeComment = (commentId: string) => dispatch => {

    dispatch(startRemoveComment(commentId));

    http.delete(`${API.comments}/${commentId}`)
        .then(
            (comment: IComment) => dispatch(removeCommentSuccess(comment)),
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
        articlesList: fromJS(payload),
        errorLoadingArticles: null,
        loadArticles: false,
    }),
    [LOADING_ARTICLES_ERROR]: (state, { payload }) => state.merge({
        errorLoadingArticles: payload,
        loadArticles: false,
    }),
    [START_ADD_ARTICLE]: state => state.set('addingArticle', true),
    [ADD_ARTICLE_SUCCESS]: (state, { payload }) => state
        .set('addingArticle', false)
        .set('errorAddArticle', null)
        .update('articlesList', list => (!!list && !!list.size)
            ? list.push(fromJS(payload))
            : List([fromJS(payload)])),
    [ADD_ARTICLE_ERROR]: (state, { payload }) => state.merge({
        addingArticle: false,
        errorAddArticle: payload,
    }),
    [START_REMOVE_ARTICLE]: (state, { payload }) => state.set('removingArticleId', payload),
    [REMOVE_ARTICLE_SUCCESS]: (state, { payload: { id } }) => state
        .set('removingArticleId', null)
        .set('errorRemoveArticle', null)
        .update(
            'articlesList',
            list => list.filter(article => article.get('id') !== id),
        ),
    [REMOVE_ARTICLE_ERROR]: (state, { payload }) => state.merge({
        removingArticleId: null,
        errorRemoveArticle: payload,
    }),
    [START_ADD_COMMENT]: (state, { payload: { articleId } }) => state.set('addingCommentArticleId', articleId),
    [ADD_COMMENT_SUCCESS]: (state, { payload }) => {
        return state
            .set('addingCommentArticleId', null)
            .set('errorRemoveComment', null)
            .update(
                'articlesList',
                list => list.map(savedArticle => savedArticle.get('id') === payload.article
                    ? savedArticle.update('comments', comments => comments.push(fromJS(payload)))
                    : savedArticle),
            );
    },
    [ADD_COMMENT_ERROR]: (state, { payload }) => state.merge({
        addingCommentArticleId: null,
        errorRemoveComment: payload,
    }),
    [START_REMOVE_COMMENT]: (state, { payload }) => state.set('removingCommentId', payload),
    [REMOVE_COMMENT_SUCCESS]: (state, { payload: { id, article } }) => {
        return state
            .set('removingCommentId', null)
            .set('errorRemoveComment', null)
            .update(
                'articlesList',
                list => list.map(savedArticle => savedArticle.get('id') === article
                    ? savedArticle.update('comments', comments => comments.filter(comment => comment.get('id') !== id))
                    : savedArticle),
            );
    },
    [REMOVE_COMMENT_ERROR]: (state, { payload }) => state.merge({
        removingCommentId: null,
        errorRemoveComment: payload,
    }),
};

export const articlesReducer = createReducer(actionHandlers, initialState);
