import * as fromAuth from "./auth.reducer";
import * as fromProducts from "./products.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State {
    auth: fromAuth.AuthState,
    products: fromProducts.ProductsState
};

export const initialState = {
    auth: fromAuth.initialState,
    products: fromProducts.initialState
};

export const reducers = {
    auth: fromAuth.reducer,
    products: fromProducts.reducer
};

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getProductsState = createFeatureSelector<fromProducts.ProductsState>('products');
export const isAuthRequestInProgress = createSelector(getAuthState, state => state.isRequestInProgress);
export const isAuthorized = createSelector(getAuthState, state => {
    return state.account && state.token && !state.token.isExpired;
});

export const getProducts = createSelector(getProductsState, state => state.products);
