import { Action } from "@ngrx/store";

export enum ActionTypes {
    AUTHENTICATE = "Authenticate user",
    AUTHENTICATE_SUCCEED = "Authenticate user succeed",
    AUTHENTICATE_FAILED = "Authenticate user failed",
    REFRESH_TOKEN = "Refresh access token"
}

export class Authenticate implements Action {

    readonly type = ActionTypes.AUTHENTICATE;

    constructor(public username: string, public password: string) {
    }
}

export class AuthenticateSucceed implements Action {

    readonly type = ActionTypes.AUTHENTICATE_SUCCEED;

    constructor(public token: any) {
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
    RefreshToken