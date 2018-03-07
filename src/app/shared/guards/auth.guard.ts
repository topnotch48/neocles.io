import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { State, isAuthorized } from "../../state";
import { Observable } from "rxjs/Observable";
import { map, take } from "rxjs/operators";
import { LoginRedirect } from "../../state/actions/auth.actions";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<State>) {
    }
    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isAuthorized),
            map(authed => {
                if(!authed)
                    this.store.dispatch(new LoginRedirect());
                return authed;
            }),
            take(1)
        );
    }
}
