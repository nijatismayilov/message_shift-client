import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { selectIsAuth } from "store/user/selectors";

const ProtectedRoute = ({ component: Component, isMain, ...rest }) => {
	const isAuth = useSelector(selectIsAuth);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isMain) {
					return isAuth ? <Component {...props} /> : <Redirect to='/signin' />;
				} else {
					return isAuth ? <Redirect to='/' /> : <Component {...props} />;
				}
			}}
		/>
	);
};

ProtectedRoute.propTypes = {
	isMain: PropTypes.bool,
};

export default ProtectedRoute;
