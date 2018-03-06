import { AuthService } from "../../services/auth.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import { Actions, Effect } from "@ngrx/effects";
import * as fromAuth from "../actions/auth.actions";
import { switchMap, catchError, withLatestFrom, map } from 'rxjs/operators';
import { of } from "rxjs/observable/of";

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private authService: AuthService) { }


    @Effect()
    onAuthenticate = this.actions
        .ofType<fromAuth.Authenticate>(fromAuth.ActionTypes.AUTHENTICATE)
        .pipe(withLatestFrom(this.store))
        .pipe(switchMap(([action, state]) => {

            const task$ = this.authService.authenticate(action.username, action.password);

            return task$
                .pipe(map(token => {
                    return new fromAuth.AuthenticateSucceed(token);
                }))
                .pipe(catchError((e) => {
                    return of(new fromAuth.AuthenticateFailed(e));
                }));
        }));

        // 	@Effect()
// 	onTemplateSelected = this.actions
// 		.ofType<fromWizard.SelectTemplateSuccess>(fromWizard.ActionTypes.STEPS_SELECT_TEMPLATE_SUCCESS)
// 		.withLatestFrom(this.store)
//         .map(([action, state]) => {
// 			const matterName = state.matter.currentMatterName;
// 			const productionName = generateProductionName(matterName);
// 			const batesInfo = action.template.BatesInfo;
// 			return new fromWizard.DefineProduction(productionName, batesInfo);
// 		});
// =

// 	@Effect()
// 	onCreateProductionSuccess = this.actions
// 		.ofType<fromWizard.CreateProductionSuccess>(fromWizard.ActionTypes.CREATE_PRODUCTION_SUCCESS)
// 		.map(action => {
// 			return new fromWizard.ResetWizard();
// 		});

//     @Effect()
//     onCreateProductionFailed = this.actions
//         .ofType<fromWizard.CreateProductionFailure>(fromWizard.ActionTypes.CREATE_PRODUCTION_FAILURE)
//         .map(action => {
//             return new CommonError(action.err);
//         });
}