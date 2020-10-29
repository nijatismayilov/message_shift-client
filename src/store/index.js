import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

import { authenticateUserSuccess, setStaySignedIn } from "./user/actions";

import { getAccessToken, getRefreshToken, getStaySignedId } from "utils/localStorage";

const composeEnhancers =
	(process.env.NODE_ENV === "development" &&
		typeof window !== "undefined" &&
		composeWithDevTools) ||
	compose;

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

const accessToken = getAccessToken();
const refreshToken = getRefreshToken();
const staySignedIn = getStaySignedId();
if (accessToken && refreshToken) store.dispatch(authenticateUserSuccess(accessToken));
if (staySignedIn) store.dispatch(setStaySignedIn(!!staySignedIn));

export default store;
