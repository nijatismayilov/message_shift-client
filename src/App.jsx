import React from "react";
import { Switch } from "react-router-dom";

import Login from "views/Login";
import Main from "views/Main";

import Scrollbar from "components/Scrollbar";
import ProtectedRoute from "components/ProtectedRoute";

import "./index.scss";

const App = () => {
	return (
		<div className='app'>
			<Scrollbar hide={true}>
				<Switch>
					<ProtectedRoute exact path='/' isMain={true} component={() => <Main />} />
					<ProtectedRoute path='/signin' isMain={false} component={() => <Login />} />
				</Switch>
			</Scrollbar>
		</div>
	);
};

export default App;
