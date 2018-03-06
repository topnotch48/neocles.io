import * as fromAuth from "./auth.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State {
	auth: fromAuth.AuthState
};

export const initialState = {
    auth: fromAuth.initialState
};

export const reducers = {
    auth: fromAuth.reducer
};

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const isAuthRequestInProgress = createSelector(getAuthState, state => state.isRequestInProgress);
