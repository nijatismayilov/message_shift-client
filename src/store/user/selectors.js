import { createSelector } from "reselect";

const selectUserState = (state) => state.user;

export const selectIsAuth = createSelector([selectUserState], (state) => state.isAuth);

export const selectUserError = createSelector([selectUserState], (state) => state.error);

export const selectUserLoading = createSelector([selectUserState], (state) => state.loading);

export const selectUserStaySignedIn = createSelector(
	[selectUserState],
	(state) => state.staySignedIn
);
