import { ActionTypes, Action } from "./types";
import { UserInfo } from "types/User";

// actions for fetching user data
export const fetchUserStart = (): Action => ({
	type: ActionTypes.FETCH_USER_START,
});

export const fetchUserSuccess = (userData: UserInfo): Action => ({
	type: ActionTypes.FETCH_USER_SUCCESS,
	payload: userData,
});

export const fetchUserFailure = (err: string): Action => ({
	type: ActionTypes.FETCH_USER_FAILURE,
	payload: err,
});

// action for cleaning user state
export const clearUserState = (): Action => ({
	type: ActionTypes.CLEAR_USER_STATE,
});
