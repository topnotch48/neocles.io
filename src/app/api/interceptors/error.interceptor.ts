import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State } from "../../state";
import { ShowError } from "../../state/actions/notification.actions";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private store: Store<State>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        // todo move navigation to side effects ideally.
                        this.router.navigate(["login"]);
                        const errorMessage = `${error.status} ${error.statusText}`;
                        this.store.dispatch(new ShowError(errorMessage));
                        return of();
                    }
                }

                return Observable.throw(error);
            })
        )
    }
}
