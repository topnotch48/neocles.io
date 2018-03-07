import * as fromAuth from "../actions/auth.actions";
import { Token } from "../../models";

export type AuthState = {
    token: Token,
    account: Account,
    isRequestInProgress: boolean,
    lastError: any | null,
}

export const initialState: AuthState = {
    token: null,
    account: null,
    isRequestInProgress: false,
    lastError: null
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
                token: action.token,
                isRequestInProgress: false
            };

        case fromAuth.ActionTypes.AUTHENTICATE_FAILED:
            return {
                ...state,
                lastError: action.err,
                isRequestInProgress: false
            };

        case fromAuth.ActionTypes.GET_ACCOUNT:
            return {
                ...state,
                isRequestInProgress: true
            };

        case fromAuth.ActionTypes.GET_ACCOUNT_SUCCEED:
            return {
                ...state,
                account: action.account,
                isRequestInProgress: false
            };

        case fromAuth.ActionTypes.GET_ACCOUNT_FAILED:
            return {
                ...state,
                lastError: action.err,
                isRequestInProgress: false
            };

        default:
            return state;
    }
}
