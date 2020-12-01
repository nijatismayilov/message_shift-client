import { createSelector } from "reselect";

import { StoreState } from "../rootReducer";
import { UserReducerState } from "./types";

const selectUser = (state: StoreState): UserReducerState => state.user;

export const selectUserError = createSelector([selectUser], (user) => user.error);

export const selectUserLoading = createSelector([selectUser], (user) => user.loading);
