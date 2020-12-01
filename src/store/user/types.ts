import { UserInfo } from "types/User";

export interface UserReducerState {
	info: UserInfo | {};
	loading: boolean;
	error: string;
}

export enum ActionTypes {
	FETCH_USER_START = "FETCH_USER_START",
	FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
	FETCH_USER_FAILURE = "FETCH_USER_FAILURE",

	CLEAR_USER_STATE = "CLEAR_USER_STATE",
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

export interface ClearUserState {
	type: typeof ActionTypes.CLEAR_USER_STATE;
}

export type Action = FetchUserStart | FetchUserSuccess | FetchUserFailure | ClearUserState;
