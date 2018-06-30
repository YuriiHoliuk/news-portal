export const API_THUNK = 'API_THUNK';

export interface IApiThunkActionPayload {
    request: () => Promise<any>;
    onStart: Array<((...args: any[]) => any) | string>;
    onSuccess: Array<((...args: any[]) => any) | string>;
    onError: Array<((...args: any[]) => any) | string>;
}

export interface IApiThunkAction {
    [API_THUNK]: IApiThunkActionPayload;
}

const createDispatcher = dispatch => (payload?) => action => {
    if (typeof action === 'function') {
        dispatch(action());
    } else {
        let newAction: any = { type: action };

        if (payload) {
            newAction = { ...newAction, payload };
        }

        dispatch(newAction);
    }
};

export const apiThunk = store => next => action => {
    if (Object.prototype.hasOwnProperty.call(action, API_THUNK)) {

        const { request, onStart, onSuccess, onError }: IApiThunkActionPayload = action[API_THUNK];

        return store.dispatch(dispatch => {
            const dispatcher = createDispatcher(dispatch);

            onStart.forEach(dispatcher());

            return request()
                .then(
                    data => onSuccess.forEach(dispatcher(data)),
                    error => onError.forEach(dispatcher(error)),
                );
        });
    }

    return next(action);
};
