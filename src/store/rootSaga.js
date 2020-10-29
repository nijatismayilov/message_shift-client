import { all, call } from "redux-saga/effects";

import {
	authenticateUserStart,
	fetchUserStart,
	registerUserStart,
	logoutUserStart,
	setSignedIn,
} from "./user/sagas";

export default function* rootSaga() {
	yield all([
		call(authenticateUserStart),
		call(fetchUserStart),
		call(registerUserStart),
		call(logoutUserStart),
		call(setSignedIn),
	]);
}
