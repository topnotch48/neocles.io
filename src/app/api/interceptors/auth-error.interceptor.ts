import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Store } from "@ngrx/store";
import { State } from "../../state/reducers";
import { LoginRedirect } from "../../state/actions/auth.actions";
import { ShowError } from "../../state/actions/notification.actions";
import { _throw } from 'rxjs/observable/throw';
import { fetchMessageFromError } from "../../shared";

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

    readonly statusesToHandle = [400, 401, 403];

    constructor(private store: Store<State>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (this.statusesToHandle.includes(error.status)) {
                        const errorMessage = fetchMessageFromError(error);
                        this.store.dispatch(new LoginRedirect());
                        this.store.dispatch(new ShowError(errorMessage, "Client Error"));
                        return of();
                    }
                }

                return _throw(error);
            })
        )
    }
}
