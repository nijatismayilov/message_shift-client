import { takeLatest, call, put } from "redux-saga/effects";

import userService from "services/userService";

import { ActionTypes } from "./types";

import { fetchUserSuccess, fetchUserFailure } from "./actions";

// workers
function* fetchUserAsync() {
	try {
		const response = yield call(userService.loadDetails);
		const { user } = response.data;

		yield put(fetchUserSuccess(user));
	} catch (err) {
		yield put(fetchUserFailure(err.message));
	}
}

// watchers
export function* fetchUser() {
	yield takeLatest(ActionTypes.FETCH_USER_START, fetchUserAsync);
}

export default [call(fetchUser)];
