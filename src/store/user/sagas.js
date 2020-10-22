import { takeLatest, call, put } from "redux-saga/effects";

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

import { setToken, removeToken } from "utils/localStorage";

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
	try {
		const { data } = yield userService.signIn(payload);
		yield call(setToken, data);
		yield put(authenticateUserSuccess(data));
	} catch (err) {
		yield put(authenticateUserFailure(err.message));
	}
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
		const { data } = yield userService.signUp(payload);
		yield put(registerUserSuccess(data));
	} catch (err) {
		yield put(registerUserFailure(err.message));
	}
}

function* logoutAsync() {
	yield call(removeToken);
}
