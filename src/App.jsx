import React from "react";
import { Route, Switch, Link } from "react-router-dom";

const App = (props) => {
	return (
		<div className='app'>
			<div>
				<Link to='/projects'>Projects</Link>
			</div>

			<Switch>
				<Route exact path='/' component={() => <div>Dashboard</div>} />
				<Route exact path='/projects' component={() => <div>projects</div>} />
			</Switch>
		</div>
	);
};

export default App;
