import { IArticle } from '../interfaces';
import {
    ADD_ARTICLE,
    LOADING_ARTICLES_ERROR,
    LOADING_ARTICLES_SUCCESS,
    REMOVE_ARTICLE,
    REMOVE_COMMENT,
    START_LOAD_ARTICLES,
} from '../store/actionTypes';

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

const initialState: IArticlesState = {
    articlesList: [],
    loading: false,
    error: null,
};

const actionHandlers = {
    [START_LOAD_ARTICLES]: (state: IArticlesState) => ({ ...state, loading: true } as IArticlesState),
    [LOADING_ARTICLES_ERROR]: (state: IArticlesState, { payload }) => ({
        ...state,
        error: payload,
        loading: false,
    } as IArticlesState),
    [LOADING_ARTICLES_SUCCESS]: (state: IArticlesState, { payload }) => ({
        ...state,
        articlesList: payload,
        error: null,
        loading: false,
    } as IArticlesState),
    [ADD_ARTICLE]: (state: IArticlesState, { payload }) => {
        const newArticle: IArticle = {
            ...payload,
            id: state.articlesList[state.articlesList.length - 1].id + 1,
            date: Date.now(),
            comments: null,
        };

        return { ...state, articlesList: [...state.articlesList, newArticle] } as IArticlesState;
    },
    [REMOVE_ARTICLE]: (state: IArticlesState, { payload: { articleId } }) => {
        return {
            ...state,
            articlesList: state.articlesList.filter(({ id }) => id !== articleId),
        } as IArticlesState;
    },
    [REMOVE_COMMENT]: (state: IArticlesState, { payload: { articleId, commentId } }) => {
        return {
            ...state,
            articlesList: state.articlesList.map((article: IArticle) => {
                return article.id === articleId
                    ? { ...article, comments: article.comments.filter(({ id }) => id !== commentId) }
                    : article;
            }),
        } as IArticlesState;
    },
};

const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
};

export default reducer;
