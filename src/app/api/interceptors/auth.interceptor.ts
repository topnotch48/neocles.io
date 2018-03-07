import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { State, getAuthState } from "../../state/reducers";
import { Observable } from "rxjs/Observable";
import { switchMap, take, skip } from "rxjs/operators";
import { Token } from "../../models/token";
import { RefreshToken } from "../../state/actions/auth.actions";
import { AppConfiguration } from "../../app.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    readonly authHeader = 'Authorization';
    readonly refreshTokenAttempHeader = "ref_token_attempt";

    constructor(private store: Store<State>, private appConfig: AppConfiguration) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authRequestsEnding = this.appConfig.apiSettings.apiAuthSuffix;

        if (request.headers.get(this.authHeader) || request.url.endsWith(authRequestsEnding))
            return next.handle(request);

        return this.store.select(getAuthState)
            .pipe(
                take(1),
                switchMap((state) => {
                    if (state.token && !state.token.isExpired) {
                        request = this.composeAuthorizedRequest(request, state.token);
                    }

                    if (!request.headers.get(this.refreshTokenAttempHeader)
                            && state.token && state.token.isExpired) {
                        this.store.dispatch(new RefreshToken(state.token.refreshToken));

                        return this.store.select(getAuthState).pipe(
                            skip(1),
                            switchMap((state) => {
                                request = request.clone({
                                    setHeaders: {
                                        refreshTokenAttempHeader: "true"
                                    }
                                })
                                return this.intercept(request, next);
                            })
                        )
                    }


                    return next.handle(request);
                })
            );
    }

    private composeAuthorizedRequest = (request: HttpRequest<any>, token: Token) => {
        const headerValue = `${token.tokenType} ${token.accessToken}`;
        const headers = request.headers.set(this.authHeader, headerValue);
        request = request.clone({
            headers: headers
        });
        return request;
    }
}
