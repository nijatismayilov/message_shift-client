import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { registerUserStart } from "store/auth/actions";

import { selectAuthLoading } from "store/auth/selectors";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { UserInfo } from "types/User";

import fadeConfig from "animation/fade";

import Logo from "assets/img/logo.svg";

import "./styles.scss";

const Login: React.FC = () => {
	const isLoading = useSelector(selectAuthLoading);

	const match = useRouteMatch();
	const dispatch = useDispatch();

	const fade = useSpring(fadeConfig);

	const handleRegisterUser = (userInfo: UserInfo) => {
		dispatch(registerUserStart(userInfo));
	};

	return (
		<animated.div style={fade} className='login-page py-10'>
			<div className='container d-flex flex-column align-center'>
				<div className='logo-box mb-15 d-flex align-center'>
					<img src={Logo} alt='Logo' className='logo-box__img' />
					<span className='logo-box__text'>MShift</span>
				</div>

				<h2 className='login-page__title mb-5 mb-xl-7'>Welcome Back</h2>

				<div className='row d-flex justify-center'>
					<div className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3'>
						<Switch>
							<Route exact path={`${match.path}`}>
								<SignIn isLoading={isLoading} />
							</Route>

							<Route path={`${match.path}/register`}>
								<SignUp registerUser={handleRegisterUser} isLoading={isLoading} />
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</animated.div>
	);
};

export default Login;
