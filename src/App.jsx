import React from "react";
import { Switch } from "react-router-dom";

import ProtectedRoute from "components/ProtectedRoute";

import Login from "views/Login";
import Main from "views/Main";

const App = () => {
	return (
		<div className='app'>
			<Switch>
				<ProtectedRoute exact path='/' isMain={true} component={() => <Main />} />
				<ProtectedRoute path='/login' isMain={false} component={() => <Login />} />
			</Switch>
		</div>
	);
};

export default App;
