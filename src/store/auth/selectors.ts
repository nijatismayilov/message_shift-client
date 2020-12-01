import { createSelector } from "reselect";

import { StoreState } from "../rootReducer";
import { AuthReducerState } from "./types";

const selectAuth = (state: StoreState): AuthReducerState => state.auth;

export const selectIsAuthenticated = createSelector([selectAuth], (auth) => auth.isAuthenticated);

export const selectAuthLoading = createSelector([selectAuth], (auth) => auth.loading);

export const selectAuthError = createSelector([selectAuth], (auth) => auth.error);
