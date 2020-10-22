import { all, call } from "redux-saga/effects";

import { authenticateUserStart, fetchUserStart, registerUserStart, logout } from "./user/sagas";

export default function* rootSaga() {
	yield all([
		call(authenticateUserStart),
		call(fetchUserStart),
		call(registerUserStart),
		call(logout),
	]);
}
