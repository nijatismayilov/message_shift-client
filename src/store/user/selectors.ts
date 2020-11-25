import { createSelector } from "reselect";

import { StoreState } from "../rootReducer";
import { UserReducerState } from "./types";

const selectUser = (state: StoreState): UserReducerState => state.user;

export const selectUserIsAuth = createSelector(
	[selectUser],
	(user: UserReducerState) => user.isAuth
);

export const selectUserError = createSelector(
	[selectUser],
	(user: UserReducerState): string => user.error
);

export const selectUserLoading = createSelector(
	[selectUser],
	(user: UserReducerState) => user.loading
);

export const selectUserStaySignedIn = createSelector(
	[selectUser],
	(user: UserReducerState) => user.staySignedIn
);
