import * as fromProducts from "../actions/products.actions";
import { Product } from "../../models";

export type ProductsState = {
    productsFilter: string,
    products: Product[],
    isRequestInProgress: boolean,
    lastError: any | null,
}

export const initialState: ProductsState = {
    productsFilter: "",
    products: [],
    isRequestInProgress: false,
    lastError: null
}

export function reducer(state = initialState, action: fromProducts.Actions) {
    switch (action.type) {
        case fromProducts.ActionTypes.APPLY_FILTER_PRODUCTS:
            if (!action.filter)
                return { ...initialState };

            const doContinuePrevFilter = state.productsFilter.includes(action.filter);

            return {
                ...state,
                productsFilter: action.filter,
                products: doContinuePrevFilter ? state.products : []
            };

        case fromProducts.ActionTypes.RETRIEVE_PRODUCTS:
            return {
                ...state,
                isRequestInProgress: true
            };

        case fromProducts.ActionTypes.RETRIEVE_PRODUCTS_SUCCEED:
            const products = state.products.concat(action.products);
            return {
                ...state,
                products: products,
                isRequestInProgress: false
            };

        case fromProducts.ActionTypes.RETRIEVE_PRODUCTS_FAILED:
            return {
                ...state,
                lastError: action.err,
                isRequestInProgress: false
            };

        default:
            return state;
    }
}
