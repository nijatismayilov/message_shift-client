import { Reducer } from "redux";

import { UserReducerState, ActionTypes, Action } from "./types";

const initialState: UserReducerState = {
	isAuth: false,
	token: "",
	info: {},
	loading: false,
	error: "",
	staySignedIn: false,
};

const reducer: Reducer<UserReducerState, Action> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.AUHTENTICATE_USER_START:
		case ActionTypes.REGISTER_USER_START:
			return {
				...state,
				loading: true,
				isAuth: false,
			};

		case ActionTypes.LOGOUT_USER_START:
			return {
				...state,
				loading: true,
			};

		case ActionTypes.AUHTENTICATE_USER_SUCCESS:
		case ActionTypes.REGISTER_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuth: true,
				token: action.payload,
			};

		case ActionTypes.AUHTENTICATE_USER_FAILURE:
		case ActionTypes.REGISTER_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
				isAuth: false,
				token: "",
			};

		case ActionTypes.FETCH_USER_START:
			return {
				...state,
				loading: true,
			};

		case ActionTypes.FETCH_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				loading: false,
			};

		case ActionTypes.FETCH_USER_FAILURE:
		case ActionTypes.LOGOUT_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		case ActionTypes.SET_STAY_SIGNED_IN:
			return {
				...state,
				staySignedIn: action.payload,
			};

		case (ActionTypes.LOGOUT_USER_SUCCESS, ActionTypes.CLEAR_USER_STATE):
			return initialState;

		default:
			return state;
	}
};

export default reducer;
