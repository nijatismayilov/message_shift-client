import * as actionTypes from "./actionTypes";

const initialState = {
	isAuth: false,
	token: "",
	user: {},
	loading: false,
	error: "",
	staySignedIn: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUHTENTICATE_USER_START:
		case actionTypes.REGISTER_USER_START:
			return {
				...state,
				loading: true,
				isAuth: false,
			};

		case actionTypes.LOGOUT_USER_START:
			return {
				...state,
				loading: true,
			};

		case actionTypes.AUHTENTICATE_USER_SUCCESS:
		case actionTypes.REGISTER_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuth: true,
				token: action.payload,
			};

		case actionTypes.AUHTENTICATE_USER_FAILURE:
		case actionTypes.REGISTER_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
				isAuth: false,
				token: "",
			};

		case actionTypes.FETCH_USER_START:
			return {
				...state,
				loading: true,
			};

		case actionTypes.FETCH_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				loading: false,
			};

		case actionTypes.LOGOUT_USER_SUCCESS:
			return initialState;

		case actionTypes.FETCH_USER_FAILURE:
		case actionTypes.LOGOUT_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		case actionTypes.CLEAR_USER_ERROR:
			return {
				...state,
				error: "",
			};

		case actionTypes.SET_STAY_SIGNED_IN:
			return {
				...state,
				staySignedIn: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
