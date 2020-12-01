import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

import { authenticateUserSuccess } from "./auth/actions";

import * as localStorage from "utils/localStorage";
import * as sessionStorage from "utils/sessionStorage";

const composeEnhancers: any =
	(process.env.NODE_ENV === "development" &&
		typeof window !== "undefined" &&
		composeWithDevTools) ||
	compose;

const sagaMiddleware = createSagaMiddleware();
const middlewares: any = [sagaMiddleware];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

const accessToken = localStorage.getAccessToken() || sessionStorage.getAccessToken();
const refreshToken = localStorage.getRefreshToken() || sessionStorage.getRefreshToken();

if (accessToken && refreshToken) store.dispatch(authenticateUserSuccess(accessToken));

export default store;
