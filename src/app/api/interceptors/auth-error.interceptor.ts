import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Store } from "@ngrx/store";
import { State } from "../../state";
import { LoginRedirect } from "../../state/actions/auth.actions";
import { ShowError } from "../../state/actions/notification.actions";

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

    readonly statuses = [401, 403];

    constructor(private store: Store<State>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (this.statuses.includes(error.status)) {
                        this.store.dispatch(new LoginRedirect());
                        const errorMessage = `${error.status} ${error.statusText}`;
                        this.store.dispatch(new ShowError(errorMessage));
                        return of();
                    }
                }
                return of(error);
            })
        )
    }
}
