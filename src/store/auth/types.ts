import { UserCredentials, UserInfo } from "types/User";

export interface AuthReducerState {
	isAuthenticated: boolean;
	loading: boolean;
	error: string;
}

export enum ActionTypes {
	AUHTENTICATE_USER_START = "AUHTENTICATE_USER_START",
	AUHTENTICATE_USER_SUCCESS = "AUHTENTICATE_USER_SUCCESS",
	AUHTENTICATE_USER_FAILURE = "AUHTENTICATE_USER_FAILURE",

	REGISTER_USER_START = "REGISTER_USER_START",
	REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS",
	REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE",

	LOGOUT_USER_START = "LOGOUT_USER_START",
	LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS",
	LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE",
}

export interface AuthenticateUserStart {
	type: typeof ActionTypes.AUHTENTICATE_USER_START;
	payload: { credentials: UserCredentials; willStayAuthenticated: boolean };
}

export interface AuthenticateUserSuccess {
	type: typeof ActionTypes.AUHTENTICATE_USER_SUCCESS;
	payload: string;
}

export interface AuthenticateUserFailure {
	type: typeof ActionTypes.AUHTENTICATE_USER_FAILURE;
	payload: string;
}

export interface RegisterUserStart {
	type: typeof ActionTypes.REGISTER_USER_START;
	payload: UserInfo;
}

export interface RegisterUserSuccess {
	type: typeof ActionTypes.REGISTER_USER_SUCCESS;
	payload: string;
}

export interface RegisterUserFailure {
	type: typeof ActionTypes.REGISTER_USER_FAILURE;
	payload: string;
}

export interface LogoutUserStart {
	type: typeof ActionTypes.LOGOUT_USER_START;
}

export interface LogoutUserSuccess {
	type: typeof ActionTypes.LOGOUT_USER_SUCCESS;
}

export interface LogoutUserFailure {
	type: typeof ActionTypes.LOGOUT_USER_FAILURE;
	payload: string;
}

export type Action =
	| AuthenticateUserStart
	| AuthenticateUserSuccess
	| AuthenticateUserFailure
	| RegisterUserStart
	| RegisterUserSuccess
	| RegisterUserFailure
	| LogoutUserStart
	| LogoutUserSuccess
	| LogoutUserFailure;
