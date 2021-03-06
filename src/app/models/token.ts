import { AuthToken } from "../api/models";


export class Token {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly tokenType: string;
    readonly username: string;
    readonly expireDate: Date;

    public get isExpired() {
        return this.expireDate.getTime() <= new Date().getTime();
    }

    constructor(token: AuthToken) {
        this.accessToken = token.access_token;
        this.expireDate = new Date(token[".expires"]);
        this.refreshToken = token.refresh_token;
        this.tokenType = token.token_type;
        this.username = token.userName;
    }
}