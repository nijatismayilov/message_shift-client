import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import TextField from "components/TextField";

import useSignInForm from "hooks/useSignInForm";

import { UserCredentials } from "types/User";

import fadeConfig from "animation/fade";

interface Props {
	staySignedIn: boolean;
	isLoading: boolean;
	authenticateUser: (credentials: UserCredentials) => void;
	setStaySignedIn: () => void;
}

const SignIn: React.FC<Props> = (props) => {
	const { staySignedIn, isLoading } = props;
	const { authenticateUser, setStaySignedIn } = props;

	const match = useRouteMatch();

	const { credentials, errors, handleChange, handleSubmit } = useSignInForm(authenticateUser);

	const fade = useSpring(fadeConfig);

	const handleTextFieldChange = (value: string, name: string) => {
		const input = {
			value,
			name,
		};

		handleChange(input);
	};

	return (
		<animated.div style={fade} className='w-100'>
			<form className='sign-in' onSubmit={handleSubmit}>
				<TextField
					type='email'
					name='email'
					label='Your Email'
					error={errors.email}
					value={credentials.email}
					onChange={(value) => handleTextFieldChange(value, "email")}
				/>

				<TextField
					type='password'
					name='password'
					label='Your Password'
					error={errors.password}
					value={credentials.password}
					onChange={(value) => handleTextFieldChange(value, "password")}
				/>

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

			<div className='d-flex justify-center align-center'>
				<p>Don't have an account yet?</p>

				<Link to={`${match.path}/register`} className='login-page__link'>
					Sign up
				</Link>
			</div>
		</animated.div>
	);
};

export default SignIn;
