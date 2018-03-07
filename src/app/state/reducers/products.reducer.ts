import * as fromProducts from "../actions/products.actions";

export type ProductsState = {
    productsFilter: string,
    products: any[],
    isRequestInProgress: boolean,
    lastError: any | null,
}

export const initialState: ProductsState = {
    productsFilter: null,
    products: [],
    isRequestInProgress: false,
    lastError: null
}

export function reducer(state = initialState, action: fromProducts.Actions) {
    switch (action.type) {
        case fromProducts.ActionTypes.APPLY_FILTER_PRODUCTS:
            if (!action.filter)
                return {
                    ...initialState,
                };

            return {
                ...state,
                productsFilter: action.filter
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
