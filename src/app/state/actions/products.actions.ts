import { Action } from "@ngrx/store";

export enum ActionTypes {
    FILTER_PRODUCTS = "Filter possible products",
    APPLY_FILTER_PRODUCTS = "Apply filter possible products",
    RETRIEVE_PRODUCTS = "Retrieve products based on current settings",
    RETRIEVE_PRODUCTS_SUCCEED = "Products were successfully retrieved",
    RETRIEVE_PRODUCTS_FAILED = "Products retrieval failed",
}

export class FilterProducts implements Action {

    readonly type = ActionTypes.FILTER_PRODUCTS;

    constructor(public filter: string = "") {
    }
}


export class ApplyFilter implements Action {

    readonly type = ActionTypes.APPLY_FILTER_PRODUCTS;

    constructor(public filter: string = null) {
    }
}


export class RetrieveProducts implements Action {

    readonly type = ActionTypes.RETRIEVE_PRODUCTS;
}


export class RetrieveProductsSucceed implements Action {

    readonly type = ActionTypes.RETRIEVE_PRODUCTS_SUCCEED;

    constructor(public products: any[]) {
    }
}

export class RetrieveProductsFailed implements Action {

    readonly type = ActionTypes.RETRIEVE_PRODUCTS_FAILED;

    constructor(public err: any) {
    }
}

export type Actions =
FilterProducts |
ApplyFilter |
RetrieveProducts |
RetrieveProductsSucceed |
RetrieveProductsFailed
