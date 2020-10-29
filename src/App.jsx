import React, { useReducer, useEffect } from "react";
import { Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectIsAuth, selectUserError, selectUserStaySignedIn } from "store/user/selectors";

import { logoutUserStart } from "store/user/actions";

import { init, actions, reducer } from "appReducer";

import Login from "views/Login";
import Main from "views/Main";

import Scrollbar from "components/Scrollbar";
import ProtectedRoute from "components/ProtectedRoute";
import Notifications from "components/NotificationsContainer";

import appMount from "lifecycleMethods/appMount";
import appUnMount from "lifecycleMethods/appUnMount";

import dispatchNewNotification from "utils/dispatchNewNotification";

import "./index.scss";

const App = () => {
	const [state, appDispatch] = useReducer(reducer, init);

	const isAuth = useSelector(selectIsAuth);
	const userError = useSelector(selectUserError);
	const staySignedIn = useSelector(selectUserStaySignedIn);

	const storeDispatch = useDispatch();

	const newNotification = (notification) => appDispatch(actions.addNotification(notification));
	const removeNotification = (id) => appDispatch(actions.removeNotification(id));

	const handleUserLogout = async () => {
		if (isAuth && !staySignedIn) await storeDispatch(logoutUserStart());
	};

	const handleUseEffect = () => {
		appMount(newNotification, removeNotification);

		return appUnMount(newNotification, removeNotification, handleUserLogout);
	};

	useEffect(handleUseEffect, []);

	useEffect(() => {
		if (userError) dispatchNewNotification("user", "error", userError);
	}, [userError]);

	return (
		<div className='app'>
			<Scrollbar hide={true}>
				<Switch>
					<ProtectedRoute exact path='/' isMain={true} component={Main} />
					<ProtectedRoute path='/signin' isMain={false} component={Login} />
				</Switch>
			</Scrollbar>

			{state.notifications && <Notifications notifications={state.notifications} />}
		</div>
	);
};

export default App;
