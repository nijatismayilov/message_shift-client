import { takeLatest, call, put } from "redux-saga/effects";

import authService from "services/authService";

import dispatchNotification from "utils/dispatchNotification";
import { NotificationTypes } from "types/Notification";

import { ActionTypes, AuthenticateUserStart, RegisterUserStart } from "./types";

import {
	authenticateUserSuccess,
	authenticateUserFailure,
	registerUserSuccess,
	registerUserFailure,
	logoutUserSuccess,
	logoutUserFailure,
} from "./actions";

import * as localStorage from "utils/localStorage";
import * as sessionStorage from "utils/sessionStorage";

// workers
function* authenticateUserAsync(action: AuthenticateUserStart) {
	const { credentials, willStayAuthenticated } = action.payload;

	try {
		const { data } = yield authService.signIn(credentials);
		const { accessToken, refreshToken } = data;

		if (willStayAuthenticated) {
			yield call(localStorage.setAccessToken, accessToken);
			yield call(localStorage.setRefreshToken, refreshToken);
		} else {
			yield call(sessionStorage.setAccessToken, accessToken);
			yield call(sessionStorage.setRefreshToken, refreshToken);
		}

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

		yield call(sessionStorage.setAccessToken, accessToken);
		yield call(sessionStorage.setRefreshToken, refreshToken);

		yield put(registerUserSuccess(accessToken));

		const message = `You were succesfully registered with the email ${email}`;
		yield call(dispatchNotification, NotificationTypes.SUCCESS, message);
	} catch (err) {
		yield put(registerUserFailure(err.message));
	}
}

function* logoutUserAsync() {
	try {
		let refreshToken: string | null = yield call(localStorage.getRefreshToken);
		if (!refreshToken) refreshToken = yield call(sessionStorage.getRefreshToken);

		if (!refreshToken) {
			const message = "There occured a problem while logging you out. Please try again";

			yield call(dispatchNotification, NotificationTypes.ERROR, message);
			throw Error(message);
		}

		yield call(authService.signOut, refreshToken);

		yield call(localStorage.removeAccessToken);
		yield call(localStorage.removeRefreshToken);
		yield call(sessionStorage.removeAccessToken);
		yield call(sessionStorage.removeRefreshToken);

		yield put(logoutUserSuccess());
	} catch (err) {
		yield put(logoutUserFailure(err.message));
	}
}

// watchers
export function* authenticateUser() {
	yield takeLatest(ActionTypes.AUHTENTICATE_USER_START, authenticateUserAsync);
}

export function* registerUser() {
	yield takeLatest(ActionTypes.REGISTER_USER_START, registerUserAsync);
}

export function* logoutUser() {
	yield takeLatest(ActionTypes.LOGOUT_USER_START, logoutUserAsync);
}

export default [call(authenticateUser), call(registerUser), call(logoutUser)];
