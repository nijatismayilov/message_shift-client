import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { getToken as getTokenFromSession } from "utils/sessionStorage";
import { getToken as getTokenFromLocal } from "utils/localStorage";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const composeEnhancers =
	(process.env.NODE_ENV === "development" &&
		typeof window !== "undefined" &&
		composeWithDevTools) ||
	compose;

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

const token = getTokenFromSession() || getTokenFromLocal();
if (token) store.dispatch({ type: "AUHTENTICATE_USER_SUCCESS", payload: token });

export default store;
