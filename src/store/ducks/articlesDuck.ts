import { fromJS, Map } from 'immutable';

import { createReducer } from '../../utils';
import { IArticle } from '../../interfaces';

import {
    ADD_ARTICLE,
    LOADING_ARTICLES_ERROR,
    LOADING_ARTICLES_SUCCESS,
    REMOVE_ARTICLE,
    REMOVE_COMMENT,
    START_LOAD_ARTICLES,
} from '../actionTypes';

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

    return fetch('http://127.0.0.1:3000/articles')
        .then(response => response.json())
        .then(
            (articlesList: IArticle[]) => dispatch(loadingArticlesSuccess(articlesList)),
            error => dispatch(loadingArticlesError(error)),
        );
};

export function addArticle(newArticle: Partial<IArticle>) {
    return {
        type: ADD_ARTICLE,
        payload: newArticle,
    };
}

export function removeArticle(articleId: string) {
    return {
        type: REMOVE_ARTICLE,
        payload: {
            articleId,
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
    loading: false,
    error: null,
});

const actionHandlers = {
    [START_LOAD_ARTICLES]: state => state.set('loading', true),
    [LOADING_ARTICLES_ERROR]: (state, { payload }) => state.merge({
        error: payload,
        loading: false,
    }),
    [LOADING_ARTICLES_SUCCESS]: (state, { payload }) => state.merge({
        articlesList: fromJS(payload),
        error: null,
        loading: false,
    }),
    [ADD_ARTICLE]: (state, { payload }) => state.update('articlesList', list => {
        const newArticle = Map({
            ...payload,
            id: list.last().get('id') + 1,
            date: Date.now(),
            comments: null,
        });

        return list.push(newArticle);
    }),
    [REMOVE_ARTICLE]: (state, { payload: { articleId } }) => state.update(
        'articlesList',
        list => list.filter(article => article.get('id') !== articleId),
    ),
    [REMOVE_COMMENT]: (state, { payload: { articleId, commentId } }) => state.update(
        'articlesList',
        list => list.map(article => article.get('id') === articleId
            ? article.update('comments', comments => comments.filter(comment => comment.get('id') !== commentId))
            : article,
        ),
    ),
};

export const articlesReducer = createReducer(actionHandlers, initialState);
