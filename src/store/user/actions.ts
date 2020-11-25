import { ActionTypes, Action } from "./types";
import { UserCredentials, UserInfo } from "types/User";

// actions for user authentication
export const authenticateUserStart = (credentials: UserCredentials): Action => ({
	type: ActionTypes.AUHTENTICATE_USER_START,
	payload: credentials,
});

export const authenticateUserSuccess = (token: string): Action => ({
	type: ActionTypes.AUHTENTICATE_USER_SUCCESS,
	payload: token,
});

export const authenticateUserFailure = (err: string): Action => ({
	type: ActionTypes.AUHTENTICATE_USER_FAILURE,
	payload: err,
});

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

// actions for user registration
export const registerUserStart = (userData: UserInfo): Action => ({
	type: ActionTypes.REGISTER_USER_START,
	payload: userData,
});

export const registerUserSuccess = (token: string): Action => ({
	type: ActionTypes.REGISTER_USER_SUCCESS,
	payload: token,
});

export const registerUserFailure = (err: string): Action => ({
	type: ActionTypes.REGISTER_USER_FAILURE,
	payload: err,
});

// actions for logging user out
export const logoutUserStart = (): Action => ({
	type: ActionTypes.LOGOUT_USER_START,
});

export const logoutUserSuccess = (): Action => ({
	type: ActionTypes.LOGOUT_USER_SUCCESS,
});

export const logoutUserFailure = (err: string): Action => ({
	type: ActionTypes.LOGOUT_USER_FAILURE,
	payload: err,
});

// action for setting user signed in
export const setStaySignedIn = (status: boolean): Action => ({
	type: ActionTypes.SET_STAY_SIGNED_IN,
	payload: status,
});

// action for cleaning user state
export const clearUserState = (): Action => ({
	type: ActionTypes.CLEAR_USER_STATE,
});
