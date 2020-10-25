import React, { useReducer, useEffect } from "react";
import { Switch } from "react-router-dom";

import { init, actions, reducer } from "appReducer";

import Login from "views/Login";
import Main from "views/Main";

import eventBus from "eventBus";

import Scrollbar from "components/Scrollbar";
import ProtectedRoute from "components/ProtectedRoute";
import Notifications from "components/NotificationsContainer";

import "./index.scss";

const App = () => {
	const [state, dispatch] = useReducer(reducer, init);

	useEffect(() => {
		eventBus.on("new-notification", (newNotification) =>
			dispatch(actions.addNotification(newNotification))
		);
		eventBus.on("remove-notification", (id) => dispatch(actions.removeNotification(id)));
	}, []);

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
