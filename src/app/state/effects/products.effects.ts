import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromProducts from "../actions/products.actions";
import { distinctUntilChanged, switchMap, withLatestFrom, map, catchError, exhaustMap, concat } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { State } from "..";
import { Store } from "@ngrx/store";
import { ProductsService, fetchMessageFromError } from "../../shared";
import { GetProductsOptions } from "../../models";
import { ShowError } from "../actions/notification.actions";

@Injectable()
export class ProductsEffects {

    readonly debounce: number;

    constructor(
        private store: Store<State>,
        private productsService: ProductsService,
        private actions: Actions) {

    }

    @Effect()
    onFilterProducts = this.actions.pipe(
        ofType<fromProducts.FilterProducts>(fromProducts.ActionTypes.FILTER_PRODUCTS),
        map(action => action.filter),
        distinctUntilChanged(),
        switchMap((filter) => {
            console.log("filter by " + filter);
            return of(new fromProducts.ApplyFilter(filter));
        }));

    @Effect()
    onFilterApplied = this.actions.pipe(
        ofType<fromProducts.ApplyFilter>(fromProducts.ActionTypes.APPLY_FILTER_PRODUCTS),
        withLatestFrom(this.store),
        switchMap(([, store]) => {
            return of(new fromProducts.RetrieveProducts());
        })
    )

    @Effect()
    onRetrieveProducts = this.actions.pipe(
        ofType<fromProducts.RetrieveProducts>(fromProducts.ActionTypes.RETRIEVE_PRODUCTS),
        withLatestFrom(this.store),
        exhaustMap(([action, store]) => {
            const query = store.products.productsFilter;
            const startIndex = store.products.products.length;
            const accountId = store.auth.account.id;

            const settings: GetProductsOptions = {
                searchQuery: query || "",
                startIndex: startIndex
            };

            return this.productsService.getProducts(accountId, settings)
                .pipe(
                    map(products => {
                        return new fromProducts.RetrieveProductsSucceed(products)
                    }),
                    catchError(error => {
                        return of(new fromProducts.RetrieveProductsFailed(error)).pipe(
                            concat(of (new ShowError(fetchMessageFromError(error)))),
                        )
                    })
                )
        }));
}
