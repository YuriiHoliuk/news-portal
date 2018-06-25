import { fromJS, List, Map } from 'immutable';

import { createReducer, http } from '../../utils';
import { IArticle } from '../../interfaces';

import {
    ADD_ARTICLE_ERROR,
    ADD_ARTICLE_SUCCESS,
    ADD_COMMENT,
    LOADING_ARTICLES_ERROR,
    LOADING_ARTICLES_SUCCESS,
    REMOVE_ARTICLE_ERROR,
    REMOVE_ARTICLE_SUCCESS,
    REMOVE_COMMENT,
    START_ADD_ARTICLE,
    START_LOAD_ARTICLES,
    START_REMOVE_ARTICLE,
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
}

export const removeArticle = (articleId: string) => dispatch => {

    dispatch(startRemoveArticle(articleId));

    return http.delete(`${API.articles}/${articleId}`)
        .then(
            (article: IArticle) => dispatch(removeArticleSuccess(article)),
            error => dispatch(removeArticleError(error)),
        );
}

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

export function addComment(articleId: string, text: string) {
    return {
        type: ADD_COMMENT,
        payload: {
            articleId,
            text,
        },
    };
}

export function removeComment(articleId: string, commentId: string) {
    return {
        type: REMOVE_COMMENT,
        payload: {
            articleId,
            commentId,
        },
    };
}

// Reducer
const initialState = fromJS({
    articlesList: [],
    loadingArticles: false,
    errorLoadArticles: null,

    addingArticle: false,
    errorAddArticle: null,

    removingArticleId: null,
    errorRemoveArticle: null,
});

const actionHandlers = {
    [START_LOAD_ARTICLES]: state => state.set('loadingArticles', true),
    [LOADING_ARTICLES_ERROR]: (state, { payload }) => state.merge({
        errorLoadingArticles: payload,
        loadArticles: false,
    }),
    [LOADING_ARTICLES_SUCCESS]: (state, { payload }) => state.merge({
        articlesList: fromJS(payload),
        errorLoadingArticles: null,
        loadArticles: false,
    }),
    [START_ADD_ARTICLE]: state => state.set('addingArticle', true),
    [ADD_ARTICLE_ERROR]: (state, { payload }) => state.merge({
        addingArticle: false,
        errorAddArticle: payload,
    }),
    [ADD_ARTICLE_SUCCESS]: (state, { payload }) => state
        .set('addingArticle', false)
        .set('errorAddArticle', null)
        .update('articlesList', list => {
            const hasArticles = !!list && !!list.size;
            const id = hasArticles ? list.last().get('id') + 1 : 1;
            const newArticle = Map({
                ...payload,
                id,
                date: Date.now(),
                comments: null,
            });

            return hasArticles ? list.push(newArticle) : List([newArticle]);
        }),
    [START_REMOVE_ARTICLE]: (state, { payload }) => state.set('removingArticleId', payload),
    [REMOVE_ARTICLE_ERROR]: (state, { payload }) => state.merge({
        removingArticleId: null,
        errorRemoveArticle: payload,
    }),
    [REMOVE_ARTICLE_SUCCESS]: (state, { payload: { id } }) => state
        .set('removingArticleId', null)
        .set('errorRemoveArticle', null)
        .update(
            'articlesList',
            list => list.filter(article => article.get('id') !== id),
        ),
    [ADD_COMMENT]: (state, { payload: { text, articleId } }) => state.update(
        'articlesList',
        list => list.map(article => article.get('id') === articleId
            ? article.update('comments', comments => {
                const hasComments = !!comments && !!comments.size;
                const id = hasComments ? comments.last().get('id') + 1 : 1;
                const newComment = Map({ text, id });

                return hasComments ? comments.push(newComment) : List([newComment]);
            })
            : article),
    ),
    [REMOVE_COMMENT]: (state, { payload: { articleId, commentId } }) => state.update(
        'articlesList',
        list => list.map(article => article.get('id') === articleId
            ? article.update('comments', comments => comments.filter(comment => comment.get('id') !== commentId))
            : article),
    ),
};

export const articlesReducer = createReducer(actionHandlers, initialState);
