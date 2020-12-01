import { Reducer } from "redux";

import { AuthReducerState, ActionTypes, Action } from "./types";

const initialState: AuthReducerState = {
	isAuthenticated: false,
	loading: false,
	error: "",
};

const reducer: Reducer<AuthReducerState, Action> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.AUHTENTICATE_USER_START:
		case ActionTypes.REGISTER_USER_START:
		case ActionTypes.LOGOUT_USER_START:
			return {
				...state,
				loading: true,
			};

		case ActionTypes.AUHTENTICATE_USER_SUCCESS:
		case ActionTypes.REGISTER_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
			};

		case ActionTypes.LOGOUT_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				error: "",
			};

		case ActionTypes.AUHTENTICATE_USER_FAILURE:
		case ActionTypes.REGISTER_USER_FAILURE:
		case ActionTypes.LOGOUT_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;
