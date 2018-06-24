import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { createReducer, http } from '../../utils';

import { ERROR, GET_ACCOUNT, SIGN_IN, SIGN_OUT, SIGN_UP, START, SUCCESS } from '../actionTypes';
import { IAuthResponse, ISignInRequest, ISignUpRequest, IUserData } from '../../interfaces';

import { env } from '../../../environment/environment';
import { API_THUNK, IApiThunkAction } from '../middlewares';

// Action creators
export const signIn = (data: ISignInRequest): IApiThunkAction => {
    return {
        [API_THUNK]: {
            request: () => http.post(env.api.auth.signIn, data)
                .then((response: IAuthResponse) => {
                    localStorage.setItem('token', response.token);
                    http.setAuthToken(response.token);

                    return response;
                }),
            onStart: [SIGN_IN + START],
            onSuccess: [SIGN_IN + SUCCESS],
            onError: [SIGN_IN + ERROR],
        },
    };
};

export const signUp = (data: ISignUpRequest): IApiThunkAction => {
    return {
        [API_THUNK]: {
            request: () => http.post(env.api.auth.signUp, data)
                .then((response: IAuthResponse) => {
                    http.setAuthToken(response.token);
                    localStorage.setItem('token', response.token);

                    return response;
                }),
            onStart: [SIGN_UP + START],
            onSuccess: [SIGN_UP + SUCCESS],
            onError: [SIGN_UP + ERROR],
        },
    };
};

export const getAccount = (): IApiThunkAction => {
    return {
        [API_THUNK]: {
            request: () => http.get(env.api.user.details),
            onStart: [GET_ACCOUNT + START],
            onSuccess: [GET_ACCOUNT + SUCCESS],
            onError: [GET_ACCOUNT + ERROR],
        },
    };
};

export const signOut = () => dispatch => {
    localStorage.removeItem('token');
    http.setAuthToken(null);
    dispatch({ type: SIGN_OUT });
};

// Reducer
const initialState = fromJS({
    token: localStorage.getItem('token'),

    singingIn: false,
    signInError: null,

    singingUp: false,
    signUpError: null,

    account: null,
});

const actionHandlers = {
    [SIGN_IN + START]: state => state.set('singingIn', true),
    [SIGN_IN + SUCCESS]: (state, { payload }) => state.merge({
        singingIn: false,
        signInError: null,
        account: fromJS(payload.account),
        token: payload.token,
    }),
    [SIGN_IN + ERROR]: (state, { payload }) => state.merge({
        singingUp: false,
        signUpError: payload,
    }),
    [SIGN_UP + START]: state => state.set('singingUp', true),
    [SIGN_UP + SUCCESS]: (state, { payload }) => state.merge({
        singingUp: false,
        signUpError: null,
        account: fromJS(payload.account),
        token: payload.token,
    }),
    [SIGN_UP + ERROR]: (state, { payload }) => state.merge({
        singingUp: false,
        signUpError: payload,
    }),
    [SIGN_OUT]: state => state.merge({
        token: null,
        account: null,
    }),
    [GET_ACCOUNT + SUCCESS]: (state, { payload }: { payload: IUserData }) => state.set('account', fromJS(payload)),
};

export const authReducer = createReducer(actionHandlers, initialState);

// Selectors
export const tokenSelector = (state: any) => state.getIn(['auth', 'token']);
export const accountSelector = (state: any) => state.getIn(['auth', 'account']);

export const isLoggedIn = createSelector(tokenSelector, accountSelector, (token, user) => !!token && !!user);
