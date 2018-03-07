import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { State, getAuthState } from "../../state";
import { Observable } from "rxjs/Observable";
import { switchMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    readonly authHeader = 'Authorization';

    constructor(private store: Store<State>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.headers.get(this.authHeader)) {

            return this.store.select(getAuthState)
                .pipe(
                    take(1),
                    switchMap((state) => {
                        if (state.token && !state.token.isExpired) {
                            const headerValue = `${state.token.tokenType} ${state.token.accessToken}`;
                            const headers = request.headers.set(this.authHeader, headerValue);
                            request = request.clone({
                                headers: headers
                            });
                        }

                        return next.handle(request);
                    })
                );
        }

        return next.handle(request)
    }
}
