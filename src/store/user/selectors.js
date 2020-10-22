import { createSelector } from "reselect";

const selectUserState = (state) => state.user;

export const selectIsAuth = createSelector([selectUserState], (state) => state.isAuth);
