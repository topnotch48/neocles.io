import { AuthService } from "../../services/auth.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import { Actions } from "@ngrx/effects";


@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private authService: AuthService) { }


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