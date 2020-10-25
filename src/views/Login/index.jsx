import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { authenticateUserStart, registerUserStart } from "store/user/actions";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import pageTransition from "animations/pageTransition";

import Logo from "assets/img/logo.svg";

import "./styles.scss";

const Login = (props) => {
	const { match } = props;

	const dispatch = useDispatch();

	const fade = useSpring(pageTransition);

	const handleAuthenticateUser = (credentials) => dispatch(authenticateUserStart(credentials));

	const handleRegisterUser = (userInfo) => dispatch(registerUserStart(userInfo));

	return (
		<animated.div style={fade} className='login-page py-10'>
			<div className='container flex flex-column align-center'>
				<div className='logo-box mb-10'>
					<img src={Logo} alt='Logo' className='logo-box__img' />
				</div>

				<h2 className='login-page__title mb-15'>Welcome to MShift</h2>

				<Switch>
					<Route exact path={`${match.path}`}>
						<SignIn authenticateUser={handleAuthenticateUser} />
					</Route>

					<Route path={`${match.path}/register`}>
						<SignUp registerUser={handleRegisterUser} />
					</Route>
				</Switch>
			</div>
		</animated.div>
	);
};

export default withRouter(Login);
