import { takeLatest, takeEvery, call, put } from "redux-saga/effects";

import authService from "services/authService";
import userService from "services/userService";

import dispatchNotification from "utils/dispatchNotification";
import { NotificationTypes } from "types/Notification";

import { ActionTypes, AuthenticateUserStart, RegisterUserStart, SetStaySignedIn } from "./types";

import {
	authenticateUserSuccess,
	authenticateUserFailure,
	fetchUserSuccess,
	fetchUserFailure,
	registerUserSuccess,
	registerUserFailure,
	logoutUserSuccess,
	logoutUserFailure,
	setStaySignedIn,
} from "./actions";

import {
	setAccessToken,
	setRefreshToken,
	removeAccessToken,
	removeRefreshToken,
	getRefreshToken,
	setStaySignedIn as setStaySignedInToStorage,
	removeStaySignedIn,
} from "utils/localStorage";

// workers
function* authenticateUserAsync(action: AuthenticateUserStart) {
	const { payload } = action;

	try {
		const { data } = yield authService.signIn(payload);
		const { accessToken, refreshToken } = data;

		yield call(setAccessToken, accessToken);
		yield call(setRefreshToken, refreshToken);

		yield put(authenticateUserSuccess(accessToken));
	} catch (err) {
		yield put(authenticateUserFailure(err.message));
	}
}

function* registerUserAsync(action: RegisterUserStart) {
	const { payload } = action;
	try {
		const { data } = yield call(authService.signUp, payload);
		const { email, accessToken, refreshToken } = data;

		yield call(setAccessToken, accessToken);
		yield call(setRefreshToken, refreshToken);

		yield put(setStaySignedIn(true));
		yield call(setStaySignedInToStorage, true);

		yield put(registerUserSuccess(accessToken));

		yield call(
			dispatchNotification,
			"register",
			NotificationTypes.SUCCESS,
			`You were succesfully registered with the email ${email}`
		);
	} catch (err) {
		yield put(registerUserFailure(err.message));
	}
}

function* fetchUserAsync() {
	try {
		const response = yield call(userService.loadDetails);
		const { user } = response.data;

		yield put(fetchUserSuccess(user));
	} catch (err) {
		yield put(fetchUserFailure(err.message));
	}
}

function* logoutUserAsync() {
	try {
		const refreshToken = yield call(getRefreshToken);

		if (!refreshToken)
			throw Error("There occured a problem while logging you out. Please try again");

		yield call(authService.signOut, refreshToken);

		yield call(removeAccessToken);
		yield call(removeRefreshToken);
		yield call(removeStaySignedIn);

		yield put(logoutUserSuccess());
	} catch (err) {
		yield put(logoutUserFailure(err.message));
	}
}

function* setSignedInAsync(action: SetStaySignedIn) {
	const { payload } = action;

	if (payload) yield call(setStaySignedInToStorage, true);
	else yield call(removeStaySignedIn);
}

// watchers
export function* authenticateUser() {
	yield takeLatest(ActionTypes.AUHTENTICATE_USER_START, authenticateUserAsync);
}

export function* registerUser() {
	yield takeLatest(ActionTypes.REGISTER_USER_START, registerUserAsync);
}

export function* fetchUser() {
	yield takeLatest(ActionTypes.FETCH_USER_START, fetchUserAsync);
}

export function* logoutUser() {
	yield takeLatest(ActionTypes.LOGOUT_USER_START, logoutUserAsync);
}

export function* setSignedIn() {
	yield takeEvery(ActionTypes.SET_STAY_SIGNED_IN, setSignedInAsync);
}

export default [
	call(authenticateUser),
	call(registerUser),
	call(fetchUser),
	call(logoutUser),
	call(setSignedIn),
];
