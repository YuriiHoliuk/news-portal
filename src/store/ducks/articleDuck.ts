import { fromJS } from 'immutable';

import { createReducer, http } from '../../utils';
import { API_THUNK, IApiThunkAction } from '../middlewares';

import { IArticle } from '../../interfaces';
import { ERROR, START, SUCCESS, LOAD_ARTICLE } from '../actionTypes';

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

// Reducer
const initialState = fromJS({
    article: null,
    loading: false,
    error: null,
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
};

export const articleReducer = createReducer(actionHandlers, initialState);
