import { UserCredentials, UserInfo } from "types/User";

export interface UserReducerState {
	isAuth: boolean;
	token: string;
	info: UserInfo | {};
	loading: boolean;
	error: string;
	staySignedIn: boolean;
}

export enum ActionTypes {
	AUHTENTICATE_USER_START = "AUHTENTICATE_USER_START",
	AUHTENTICATE_USER_SUCCESS = "AUHTENTICATE_USER_SUCCESS",
	AUHTENTICATE_USER_FAILURE = "AUHTENTICATE_USER_FAILURE",

	FETCH_USER_START = "FETCH_USER_START",
	FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
	FETCH_USER_FAILURE = "FETCH_USER_FAILURE",

	REGISTER_USER_START = "REGISTER_USER_START",
	REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS",
	REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE",

	LOGOUT_USER_START = "LOGOUT_USER_START",
	LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS",
	LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE",

	SET_STAY_SIGNED_IN = "SET_STAY_SIGNED_IN",

	CLEAR_USER_STATE = "CLEAR_USER_STATE",
}

export interface AuthenticateUserStart {
	type: typeof ActionTypes.AUHTENTICATE_USER_START;
	payload: UserCredentials;
}

export interface AuthenticateUserSuccess {
	type: typeof ActionTypes.AUHTENTICATE_USER_SUCCESS;
	payload: string;
}

export interface AuthenticateUserFailure {
	type: typeof ActionTypes.AUHTENTICATE_USER_FAILURE;
	payload: string;
}

export interface FetchUserStart {
	type: typeof ActionTypes.FETCH_USER_START;
}

export interface FetchUserSuccess {
	type: typeof ActionTypes.FETCH_USER_SUCCESS;
	payload: UserInfo;
}

export interface FetchUserFailure {
	type: typeof ActionTypes.FETCH_USER_FAILURE;
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

export interface SetStaySignedIn {
	type: typeof ActionTypes.SET_STAY_SIGNED_IN;
	payload: boolean;
}

export interface ClearUserState {
	type: typeof ActionTypes.CLEAR_USER_STATE;
}

export type Action =
	| AuthenticateUserStart
	| AuthenticateUserSuccess
	| AuthenticateUserFailure
	| FetchUserStart
	| FetchUserSuccess
	| FetchUserFailure
	| RegisterUserStart
	| RegisterUserSuccess
	| RegisterUserFailure
	| LogoutUserStart
	| LogoutUserSuccess
	| LogoutUserFailure
	| SetStaySignedIn
	| ClearUserState;
