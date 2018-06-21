import { IArticle } from '../interfaces';
import {
    ADD_ARTICLE,
    LOADING_ARTICLES_ERROR,
    LOADING_ARTICLES_SUCCESS,
    REMOVE_ARTICLE,
    REMOVE_COMMENT,
    START_LOAD_ARTICLES,
} from '../store/actionTypes';
import { fromJS, Map } from 'immutable';

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

export interface IArticlesState {
    articlesList: IArticle[];
    loading: boolean;
    error: any;
}

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
    [LOADING_ARTICLES_SUCCESS]: (state, { payload }) => {
        return state.merge({
            articlesList: fromJS(payload),
            error: null,
            loading: false,
        });
    },
    [ADD_ARTICLE]: (state, { payload }) => {
        const list = state.get('articlesList');
        const newArticle = Map({
            ...payload,
            id: list.last().get('id') + 1,
            date: Date.now(),
            comments: null,
        });

        return state.set('articlesList', state.get('articlesList').push(newArticle));
    },
    [REMOVE_ARTICLE]: (state, { payload: { articleId } }) => {
        return state.set(
            'articlesList',
            state.get('articlesList').filter(article => article.get('id') !== articleId),
        );
    },
    [REMOVE_COMMENT]: (state, { payload: { articleId, commentId } }) => {
        return state.set('articlesList', state.get('articlesList').map(article => {
            const id = article.get('id');
            return id === articleId
                ? article.set('comments', article.get('comments').filter(comment => comment.get('id') !== commentId))
                : article;
        }));
    },
};

const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
};

export default reducer;
