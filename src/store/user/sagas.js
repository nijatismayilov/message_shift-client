import { takeLatest, call, put, all } from "redux-saga/effects";

import userService from "services/userService";

import {
	AUHTENTICATE_USER_START,
	FETCH_USER_START,
	REGISTER_USER_START,
	LOGOUT,
} from "./actionTypes";

import {
	authenticateUserSuccess,
	authenticateUserFailure,
	fetchUserSuccess,
	fetchUserFailure,
	registerUserSuccess,
	registerUserFailure,
} from "./actions";

import {
	setToken as setTokenToSession,
	removeToken as removeTokenFromSession,
} from "utils/sessionStorage";
import {
	setToken as setTokenToLocal,
	removeToken as removeTokenFromLocal,
} from "utils/localStorage";

import eventBus from "eventBus";

import generateKey from "utils/generateKey";

export function* authenticateUserStart() {
	yield takeLatest(AUHTENTICATE_USER_START, authenticateUserAsync);
}

export function* fetchUserStart() {
	yield takeLatest(FETCH_USER_START, fetchUserAsync);
}

export function* registerUserStart() {
	yield takeLatest(REGISTER_USER_START, registerUserAsync);
}

export function* logout() {
	yield takeLatest(LOGOUT, logoutAsync);
}

function* authenticateUserAsync({ payload }) {
	const { credentials, remember } = payload;

	let message;
	let type;

	try {
		const { data: token } = yield userService.signIn(credentials);

		if (remember) yield call(setTokenToLocal, token);
		else yield call(setTokenToSession, token);

		yield put(authenticateUserSuccess(token));

		message = "You are signed in succesfully";
		type = "success";
	} catch (err) {
		yield put(authenticateUserFailure(err.message));

		message = err.message;
		type = "error";
	}

	const newNotification = { id: generateKey("authenticate"), message, type };
	eventBus.dispatch("new-notification", newNotification);
}

function* fetchUserAsync() {
	try {
		const { data } = yield userService.loadDetails();
		yield put(fetchUserSuccess(data));
	} catch (err) {
		yield put(fetchUserFailure(err.message));
	}
}

function* registerUserAsync({ payload }) {
	try {
		const { data: token } = yield userService.signUp(payload);

		yield call(setTokenToSession, token);
		yield put(registerUserSuccess(token));
	} catch (err) {
		yield put(registerUserFailure(err.message));
	}
}

function* logoutAsync() {
	yield all([call(removeTokenFromSession), call(removeTokenFromLocal)]);
}
