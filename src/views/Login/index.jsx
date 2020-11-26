import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { authenticateUserStart, registerUserStart, setStaySignedIn } from "store/user/actions";

import { selectUserStaySignedIn, selectUserLoading } from "store/user/selectors";

import Logo from "assets/img/logo.svg";

import "./styles.scss";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login = (props) => {
	const { match } = props;

	const staySignedIn = useSelector(selectUserStaySignedIn);
	const isLoading = useSelector(selectUserLoading);

	const dispatch = useDispatch();

	const fade = useSpring({
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		},
	});

	const handleAuthenticateUser = (credentials) => dispatch(authenticateUserStart(credentials));

	const handleRegisterUser = (userInfo) => dispatch(registerUserStart(userInfo));

	const handleSetStaySignedIn = () => dispatch(setStaySignedIn(!staySignedIn));

	return (
		<animated.div style={fade} className='login-page py-10'>
			<div className='container flex flex-column align-center'>
				<div className='logo-box mb-10'>
					<img src={Logo} alt='Logo' className='logo-box__img' />
				</div>

				<h2 className='login-page__title mb-5 mb-xl-15'>Welcome to MShift</h2>

				<div className='row flex justify-center'>
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

export default withRouter(Login);
