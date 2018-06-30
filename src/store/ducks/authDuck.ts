import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { createReducer, http } from '../../utils';

import { ERROR, GET_ACCOUNT, SIGN_IN, SIGN_OUT, SIGN_UP, START, SUCCESS } from '../actionTypes';
import { IAuthResponse, ISignInRequest, ISignUpRequest, IUserData } from '../../interfaces';

import { env } from '../../../environment/environment';

// Action creators
export function signInStart() {
    return {
        type: SIGN_IN + START,
    };
}

export function signInSuccess(response: IAuthResponse) {
    return {
        type: SIGN_IN + SUCCESS,
        payload: response,
    };
}

export function signInError(error: any) {
    return {
        type: SIGN_IN + ERROR,
        payload: error,
    };
}

export const signIn = (data: ISignInRequest) => dispatch => {
    dispatch(signInStart());

    return http.post(env.api.auth.signIn, data)
        .then(
            (response: IAuthResponse) => {
                localStorage.setItem('token', response.token);
                http.setAuthToken(response.token);
                dispatch(signInSuccess(response));
            },
            error => dispatch(signInError(error)),
        );
};

export function signUpStart() {
    return {
        type: SIGN_UP + START,
    };
}

export function signUpSuccess(response: IAuthResponse) {
    return {
        type: SIGN_UP + SUCCESS,
        payload: response,
    };
}

export function signUpError(error: any) {
    return {
        type: SIGN_UP + ERROR,
        payload: error,
    };
}

export const signUp = (data: ISignUpRequest) => dispatch => {
    dispatch(signUpStart());

    return http.post(env.api.auth.signUp, data)
        .then(
            (response: IAuthResponse) => {
                dispatch(signUpSuccess(response));
                http.setAuthToken(response.token);
                localStorage.setItem('token', response.token);
            },
            error => dispatch(signUpError(error)),
        );
};

export function getAccountStart() {
    return {
        type: GET_ACCOUNT + START,
    };
}

export function getAccountSuccess(response: IUserData) {
    return {
        type: GET_ACCOUNT + SUCCESS,
        payload: response,
    };
}

export function getAccountError(error: any) {
    return {
        type: GET_ACCOUNT + ERROR,
        payload: error,
    };
}

export const getAccount = () => dispatch => {
    dispatch(getAccountStart());

    return http.get(env.api.user.details)
        .then(
            (response: IUserData) => dispatch(getAccountSuccess(response)),
            error => dispatch(getAccountError(error)),
        );
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
    [GET_ACCOUNT + SUCCESS]: (state, { payload }) => state.set('account', fromJS(payload)),
};

export const authReducer = createReducer(actionHandlers, initialState);

// Selectors
export const tokenSelector = (state: any) => state.getIn(['auth', 'token']);
export const accountSelector = (state: any) => state.getIn(['auth', 'account']);

export const isLoggedIn = createSelector(tokenSelector, accountSelector, (token, user) => !!token && !!user);
