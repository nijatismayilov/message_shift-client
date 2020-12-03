import { ActionTypes, Action } from "./types";
import { UserInfo } from "types/User";

export interface authPayload {
	email: string;
	password: string;
	willStayAuth: boolean;
}

// actions for user authentication
export const authenticateUserStart = (values: authPayload): Action => ({
	type: ActionTypes.AUHTENTICATE_USER_START,
	payload: {
		credentials: { email: values.email, password: values.password },
		willStayAuthenticated: values.willStayAuth,
	},
});

export const authenticateUserSuccess = (token: string): Action => ({
	type: ActionTypes.AUHTENTICATE_USER_SUCCESS,
	payload: token,
});

export const authenticateUserFailure = (err: string): Action => ({
	type: ActionTypes.AUHTENTICATE_USER_FAILURE,
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
