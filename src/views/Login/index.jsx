import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { authenticateUserStart } from "store/user/actions";

import useSignInForm from "hooks/useSignInForm";

import Logo from "assets/img/logo.svg";

import "./styles.scss";

const Login = (props) => {
	const { authenticateUser } = props;

	const { credentials, handleChange, handleSubmit, errors } = useSignInForm(authenticateUser);

	return (
		<div className='login-page py-10'>
			<div className='container flex flex-column align-center'>
				<div className='logo-box mb-10'>
					<img src={Logo} alt='Logo' className='logo-box__img' />
				</div>

				<h2 className='login-page__title mb-15'>Welcome to MShift</h2>

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
									className={`sign-in__label ${
										credentials.password ? "sign-in__label--active" : ""
									}`}
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

					<Link to='/signup' className='login-page__link'>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	authenticateUser: (credentials) => dispatch(authenticateUserStart(credentials)),
});

export default connect(null, mapDispatchToProps)(Login);
