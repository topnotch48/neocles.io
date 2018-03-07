import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { map, take } from "rxjs/operators";
import { AppConfiguration } from "../../app.config";
import { AuthToken, Token } from "../../models";

@Injectable()
export class AuthService {

    readonly tokenUrl: string;

    constructor(private config: AppConfiguration, private httpClient: HttpClient) {
        this.tokenUrl = `${this.config.apiBaseUrl}/token`;
    }

    authenticate(username: string, password: string): Observable<Token> {
        let params = new HttpParams();
        params = params.set('grant_type', 'password');
        params = params.set('username', username);
        params = params.set('password', password);
        return this.httpClient.post<AuthToken>(this.tokenUrl, params)
            .pipe(
                map(token => {
                    return new Token(token);
                }),
                take(1)
            );
    }

    refreshToken(refreshToken: string): Observable<Token> {
        let params = new HttpParams();
        params = params.set('grant_type', 'refresh_token');
        params = params.set('refresh_token', refreshToken);
        return this.httpClient.post<AuthToken>(this.tokenUrl, params)
            .pipe(
                map(token => {
                    return new Token(token);
                }),
                take(1)
            );
    }
}
