import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromAuth from "../actions/auth.actions";
import { switchMap, catchError, map, tap, flatMap, concat } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { AuthService, AccountsService } from "../../shared/services";
import { Router } from "@angular/router";
import { Constants } from "../../app.routing-constants";
import { ShowError } from "../actions/notification.actions";
import { fetchMessageFromError } from "../../shared";

@Injectable()
export class AuthEffects {

    constructor(
        private router: Router,
        private actions: Actions,
        private authService: AuthService,
        private accountsService: AccountsService) {
    }

    @Effect()
    onAuthenticate = this.actions.pipe(
        ofType<fromAuth.Authenticate>(fromAuth.ActionTypes.AUTHENTICATE),
        switchMap((action) => {
            return this.authService.authenticate(action.username, action.password)
                .pipe(
                    flatMap(token => {
                        return [
                            new fromAuth.AuthenticateSucceed(token),
                            new fromAuth.GetAccount()
                        ]
                    }),
                    catchError(error => {
                        return of(new fromAuth.AuthenticateFailed(error)).pipe(
                            concat(of (new ShowError(fetchMessageFromError(error)))),
                        )
                    })
                )
        }));

    @Effect()
    onRefreshToken = this.actions.pipe(
        ofType<fromAuth.RefreshToken>(fromAuth.ActionTypes.REFRESH_TOKEN),
        switchMap((action) => {
            return this.authService.refreshToken(action.refreshToken)
                .pipe(
                    map(token => {
                        return new fromAuth.AuthenticateSucceed(token);
                    }),
                    catchError(error => {
                        return of(new fromAuth.AuthenticateFailed(error)).pipe(
                            concat(of (new ShowError(fetchMessageFromError(error)))),
                        );
                    })
                )
        }));

    @Effect()
    onGetAccount = this.actions.pipe(
        ofType<fromAuth.GetAccount>(fromAuth.ActionTypes.GET_ACCOUNT),
        switchMap((action) => {
            return this.accountsService.getDefaultAccount()
                .pipe(
                    map(account => {
                        return new fromAuth.GetAccountSucceed(account)
                    }),
                    catchError(error => {
                        return of(new fromAuth.GetAccountFailed(error)).pipe(
                            concat(of (new ShowError(fetchMessageFromError(error)))),
                        )
                    })
                )
        }));

    @Effect({ dispatch: false })
    onSuccessfulAccountRetrieval = this.actions.pipe(
        ofType<fromAuth.GetAccountSucceed>(fromAuth.ActionTypes.GET_ACCOUNT_SUCCEED),
        tap(() => {
            this.router.navigate([Constants.ProductsOverview]);
        })
    )

    @Effect({ dispatch: false })
    onLoginRedirect = this.actions.pipe(
        ofType<fromAuth.LoginRedirect>(fromAuth.ActionTypes.LOGIN_REDIRECT),
        tap(() => {
            this.router.navigate([Constants.Login]);
        })
    )
}
