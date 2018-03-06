import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { AppConfiguration } from "../app.config";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {

    constructor(private config: AppConfiguration, private httpClient: HttpClient) {

    }

    authenticate(username: string, password: string): Observable<any> {
        const url = `${this.config.apiBaseUrl}/token`;
        let params = new HttpParams();
        params = params.set('grant_type', 'password');
        params = params.set('username', username);
        params = params.set('password', password);
        return this.httpClient.post(url, params)
            .map(token => {
                return token;
            });
    }

    refreshToken() {

    }
}