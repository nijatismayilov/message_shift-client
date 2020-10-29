import { takeLatest, takeEvery, call, put } from "redux-saga/effects";

import authService from "services/authService";
import userService from "services/userService";

import eventBus from "eventBus";

import generateKey from "utils/generateKey";

import {
	AUHTENTICATE_USER_START,
	FETCH_USER_START,
	REGISTER_USER_START,
	LOGOUT_USER_START,
	SET_STAY_SIGNED_IN,
} from "./actionTypes";

import {
	authenticateUserSuccess,
	authenticateUserFailure,
	fetchUserSuccess,
	fetchUserFailure,
	registerUserSuccess,
	registerUserFailure,
	logoutUserSuccess,
	logoutUserFailure,
	clearError,
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

export function* authenticateUserStart() {
	yield takeLatest(AUHTENTICATE_USER_START, authenticateUserAsync);
}

export function* registerUserStart() {
	yield takeLatest(REGISTER_USER_START, registerUserAsync);
}

export function* fetchUserStart() {
	yield takeLatest(FETCH_USER_START, fetchUserAsync);
}

export function* logoutUserStart() {
	yield takeLatest(LOGOUT_USER_START, logoutUserAsync);
}

export function* setSignedIn() {
	yield takeEvery(SET_STAY_SIGNED_IN, setSignedInAsync);
}

function* authenticateUserAsync({ payload }) {
	const { credentials } = payload;

	try {
		const { data } = yield authService.signIn(credentials);
		const { accessToken, refreshToken } = data;

		yield call(setAccessToken, accessToken);
		yield call(setRefreshToken, refreshToken);

		yield put(authenticateUserSuccess(accessToken));
	} catch (err) {
		yield put(clearError());
		yield put(authenticateUserFailure(err.message));
	}
}

function* registerUserAsync({ payload }) {
	try {
		const { data } = yield authService.signUp(payload);
		const { email, accessToken, refreshToken } = data;

		yield call(setAccessToken, accessToken);
		yield call(setRefreshToken, refreshToken);

		yield put(registerUserSuccess(accessToken));
		yield put(setStaySignedIn(true));
		yield put(setStaySignedInToStorage(true));

		eventBus.dispatch("new-notification", {
			id: generateKey("register"),
			type: "success",
			message: `You were succesfully registered with the email ${email}`,
		});
	} catch (err) {
		yield put(clearError());
		yield put(registerUserFailure(err.message));
	}
}

function* fetchUserAsync() {
	try {
		const { data } = yield userService.loadDetails();
		yield put(fetchUserSuccess(data));
	} catch (err) {
		yield put(clearError());
		yield put(fetchUserFailure(err.message));
	}
}

function* logoutUserAsync() {
	try {
		const refreshToken = getRefreshToken();

		if (!refreshToken)
			throw Error("There occured a problem while logging you out. Please try again");

		yield authService.signOut(refreshToken);

		yield call(removeAccessToken);
		yield call(removeRefreshToken);
		yield call(removeStaySignedIn);

		yield put(logoutUserSuccess());
	} catch (err) {
		yield put(clearError());
		yield put(logoutUserFailure(err.message));
	}
}

function* setSignedInAsync({ payload }) {
	if (payload) yield call(setStaySignedInToStorage, true);
	else yield call(removeStaySignedIn);
}
