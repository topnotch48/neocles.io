import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromAuth from "../actions/auth.actions";
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { AuthService, AccountsService } from "../../shared";
import { Router } from "@angular/router";

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
                    map(token => {
                        return new fromAuth.AuthenticateSucceed(token);
                    }),
                    catchError(error => {
                        return of(new fromAuth.AuthenticateFailed(error));
                    })
                )
        }));

    @Effect()
    onSuccessfulAuthentication = this.actions.pipe(
        ofType<fromAuth.AuthenticateSucceed>(fromAuth.ActionTypes.AUTHENTICATE_SUCCEED),
        switchMap((action) => {
            return this.accountsService.getDefaultAccount()
                .pipe(
                    map(account => {
                        return new fromAuth.GetAccountSucceed(account)
                    }),
                    catchError(error => {
                        return of(new fromAuth.GetAccountFailed(error))
                    })
                )
        }));

    @Effect({ dispatch: false })
    onSuccessfulAccountRetrieval = this.actions.pipe(
        ofType<fromAuth.GetAccountSucceed>(fromAuth.ActionTypes.GET_ACCOUNT_SUCCEED),
        tap(() => {
            this.router.navigate([ Constants.Login ]);
        })
    )
}
