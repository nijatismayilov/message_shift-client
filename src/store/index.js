import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { getToken as getTokenFromSession } from "utils/sessionStorage";
import { getToken as getTokenFromLocal } from "utils/localStorage";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

const token = getTokenFromSession() || getTokenFromLocal();
if (token) store.dispatch({ type: "AUHTENTICATE_USER_SUCCESS" });

export default store;
