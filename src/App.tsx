import React, { lazy, Suspense, useReducer, useEffect } from "react";
import { Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectUserIsAuth, selectUserStaySignedIn } from "store/user/selectors";

import { logoutUserStart } from "store/user/actions";

import eventBus from "eventBus";

import { initialState, reducer, actions as AppReducerActions } from "./useReducer";

import { Notification } from "types/Notification";

import Scrollbar from "components/Scrollbar";
import ProtectedRoute from "components/ProtectedRoute/index";
import NotificationsContainer from "components/NotificationsContainer/index";

import "./index.scss";

import Spinner from "components/Spinner";

const Login = lazy(() => import("views/Login"));
const Main = lazy(() => import("views/Main"));

const App: React.FC = () => {
	const [state, appDispatch] = useReducer(reducer, initialState);

	const isAuth = useSelector(selectUserIsAuth);
	const staySignedIn = useSelector(selectUserStaySignedIn);

	const storeDispatch = useDispatch();

	const handleAddNotification = (notification: Notification): void => {
		appDispatch(AppReducerActions.addNotification(notification));
	};
	const handleRemoveNotification = (id: string): void => {
		appDispatch(AppReducerActions.removeNotification(id));
	};

	const handleUserLogout = (): void => {
		if (isAuth && !staySignedIn) storeDispatch(logoutUserStart());
	};

	const handleMount = () => {
		eventBus.on("new-notification", handleAddNotification);
		eventBus.on("remove-notification", handleRemoveNotification);

		return () => {
			eventBus.remove("new-notification", handleAddNotification);
			eventBus.remove("remove-notification", handleRemoveNotification);

			handleUserLogout();
		};
	};

	useEffect(handleMount, []);

	return (
		<div className='app'>
			<Scrollbar hide={true}>
				<Suspense fallback={<Spinner />}>
					<Switch>
						<ProtectedRoute exact path='/' isMain={true} component={Main} />
						<ProtectedRoute path='/signin' isMain={false} component={Login} />
					</Switch>
				</Suspense>
			</Scrollbar>

			{state.notifications && <NotificationsContainer notifications={state.notifications} />}
		</div>
	);
};

export default App;
