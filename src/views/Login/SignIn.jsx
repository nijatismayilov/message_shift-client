import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import useSignInForm from "hooks/useSignInForm";

const SignIn = (props) => {
	const { match, staySignedIn, isLoading } = props;
	const { authenticateUser, setStaySignedIn } = props;

	const { credentials, errors, handleChange, handleSubmit } = useSignInForm(authenticateUser);

	const fade = useSpring({
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		},
	});

	return (
		<animated.div style={fade} className='w-100'>
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
						checked={staySignedIn}
						onChange={setStaySignedIn}
					/>
					<label htmlFor='rememberMe' className='sign-in__checkbox-label'>
						<span className='sign-in__checkbox-label-indicator'></span>
						Keep me signed in
					</label>
				</div>

				<button type='submit' disabled={isLoading} className='sign-in__btn-submit' formNoValidate>
					Sign in
				</button>
			</form>

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
