import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { authenticateUserStart, registerUserStart, setStaySignedIn } from "store/user/actions";

import { selectUserStaySignedIn, selectUserLoading } from "store/user/selectors";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { UserCredentials, UserInfo } from "types/User";

import fadeConfig from "animation/fade";

import Logo from "assets/img/logo.svg";

import "./styles.scss";

const Login: React.FC = () => {
	const match = useRouteMatch();

	const staySignedIn = useSelector(selectUserStaySignedIn);
	const isLoading = useSelector(selectUserLoading);

	const dispatch = useDispatch();

	const fade = useSpring(fadeConfig);

	const handleAuthenticateUser = (credentials: UserCredentials) => {
		dispatch(authenticateUserStart(credentials));
	};

	const handleRegisterUser = (userInfo: UserInfo) => {
		dispatch(registerUserStart(userInfo));
	};

	const handleSetStaySignedIn = (checked: boolean) => {
		dispatch(setStaySignedIn(checked));
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
								<SignIn
									authenticateUser={handleAuthenticateUser}
									setStaySignedIn={handleSetStaySignedIn}
									staySignedIn={staySignedIn}
									isLoading={isLoading}
								/>
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
