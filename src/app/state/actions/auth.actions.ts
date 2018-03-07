import { Action } from "@ngrx/store";
import { Token } from "../../models";

export enum ActionTypes {
    LOGIN_REDIRECT = "Redirect to login page",
    AUTHENTICATE = "Authenticate user",
    AUTHENTICATE_SUCCEED = "Authenticate user succeed",
    AUTHENTICATE_FAILED = "Authenticate user failed",
    GET_ACCOUNT = "Get user account",
    GET_ACCOUNT_SUCCEED = "Get user account succeeed",
    GET_ACCOUNT_FAILED = "Get user account failed",
    REFRESH_TOKEN = "Refresh access token"
}

export class LoginRedirect implements Action {

    readonly type = ActionTypes.LOGIN_REDIRECT;
}

export class Authenticate implements Action {

    readonly type = ActionTypes.AUTHENTICATE;

    constructor(public username: string, public password: string) {
    }
}

export class AuthenticateSucceed implements Action {

    readonly type = ActionTypes.AUTHENTICATE_SUCCEED;

    constructor(public token: Token) {
    }
}


export class GetAccount implements Action {

    readonly type = ActionTypes.GET_ACCOUNT;

    constructor() {
    }
}

export class GetAccountSucceed implements Action {

    readonly type = ActionTypes.GET_ACCOUNT_SUCCEED;

    constructor(public account: any) {
    }
}


export class GetAccountFailed implements Action {

    readonly type = ActionTypes.GET_ACCOUNT_FAILED;

    constructor(public err: any) {
    }
}

export class AuthenticateFailed implements Action {

    readonly type = ActionTypes.AUTHENTICATE_FAILED;

    constructor(public err: any) {
    }
}

export class RefreshToken implements Action {
    readonly type = ActionTypes.REFRESH_TOKEN;

    constructor(public refreshToken: string) {
    }
}

export type Actions =
    Authenticate |
    AuthenticateFailed |
    AuthenticateSucceed |
    GetAccount |
    GetAccountSucceed |
    GetAccountFailed |
    RefreshToken
