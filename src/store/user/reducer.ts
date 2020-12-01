import { Reducer } from "redux";

import { UserReducerState, ActionTypes, Action } from "./types";

const initialState: UserReducerState = {
	info: {},
	loading: false,
	error: "",
};

const reducer: Reducer<UserReducerState, Action> = (state = initialState, action) => {
	switch (action.type) {
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
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		case ActionTypes.CLEAR_USER_STATE:
			return initialState;

		default:
			return state;
	}
};

export default reducer;
