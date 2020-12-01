import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "store/auth/selectors";

interface Props {
	isMain: boolean;
	component: React.ElementType;
	exact?: boolean;
	path: string;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, isMain, ...props }) => {
	const isAuth = useSelector(selectIsAuthenticated);

	return (
		<Route
			{...props}
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

export default ProtectedRoute;
