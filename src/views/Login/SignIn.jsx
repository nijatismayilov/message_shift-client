import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import useSignInForm from "hooks/useSignInForm";

import pageTransition from "animation/pageTransition";

const SignIn = (props) => {
	const { match } = props;
	const { authenticateUser } = props;

	const [remember, setRemember] = useState(false);
	const { credentials, errors, handleChange, handleSubmit } = useSignInForm(
		authenticateUser,
		remember
	);

	const fade = useSpring(pageTransition);

	const handleCheckboxChange = () => {
		setRemember(!remember);
	};

	return (
		<animated.div style={fade} className='w-100'>
			<div className='row flex justify-center'>
				<div className='col-lg-3'>
					<form className='sign-in' onSubmit={handleSubmit}>
						<div className='sign-in__input-group'>
							<input
								type='email'
								name='email'
								id='email'
								autoComplete='new-password'
								className={`sign-in__input ${errors.email ? "sign-in__input--error" : ""}`}
								value={credentials.email}
								onChange={handleChange}
							/>
							<label
								htmlFor='email'
								className={`sign-in__label ${credentials.email ? "sign-in__label--active" : ""}`}
							>
								Your Email
							</label>

							<p
								className={`sign-in__input-error ${
									errors.email ? "sign-in__input-error--visible" : ""
								}`}
							>
								{errors.email}
							</p>
						</div>

						<div className='sign-in__input-group'>
							<input
								type='password'
								name='password'
								id='password'
								autoComplete='new-password'
								className={`sign-in__input ${errors.password ? "sign-in__input--error" : ""}`}
								value={credentials.password}
								onChange={handleChange}
							/>
							<label
								htmlFor='password'
								className={`sign-in__label ${credentials.password ? "sign-in__label--active" : ""}`}
							>
								Your Password
							</label>

							<p
								className={`sign-in__input-error ${
									errors.password ? "sign-in__input-error--visible" : ""
								}`}
							>
								{errors.password}
							</p>
						</div>

						<div className='sign-in__checkbox-group'>
							<input
								type='checkbox'
								name='rememberMe'
								id='rememberMe'
								className='sign-in__checkbox'
								checked={remember}
								onChange={handleCheckboxChange}
							/>
							<label htmlFor='rememberMe' className='sign-in__checkbox-label'>
								Keep me signed in
							</label>
						</div>

						<button type='submit' className='sign-in__btn-submit' formNoValidate>
							Sign in
						</button>
					</form>
				</div>
			</div>

			<div className='flex justify-center align-center'>
				<p>Don't have an account yet?</p>

				<Link to={`${match.path}/register`} className='login-page__link'>
					Sign up
				</Link>
			</div>
		</animated.div>
	);
};

export default withRouter(SignIn);
