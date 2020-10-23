import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import { selectIsAuth } from "store/user/selectors";

const ProtectedRoute = ({ component: Component, isMain, isAuth, ...rest }) => (
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

const mapStateToProps = createStructuredSelector({
	isAuth: selectIsAuth,
});

ProtectedRoute.propTypes = {
	isMain: PropTypes.bool,
};

export default connect(mapStateToProps)(ProtectedRoute);
