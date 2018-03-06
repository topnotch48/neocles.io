import * as fromAuth from "../actions/auth.actions";

export type AuthState = {
    isRequestInProgress: boolean
}

export const initialState: AuthState = {
    isRequestInProgress: false
}

export function reducer(state = initialState, action: fromAuth.Actions) {
    switch (action.type) {
        case fromAuth.ActionTypes.AUTHENTICATE:
            return {
                ...state,
                isRequestInProgress: true
            };

        case fromAuth.ActionTypes.AUTHENTICATE_SUCCEED:
            return {
                ...state,
                isRequestInProgress: false
            };

        case fromAuth.ActionTypes.AUTHENTICATE_FAILED:
            return {
                ...state,
                isRequestInProgress: false
            };

        default:
            return state;
    }
}