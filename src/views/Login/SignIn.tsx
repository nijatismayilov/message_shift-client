import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import TextField from "components/TextField";
import Checkbox from "components/Checkbox";

import useSignInForm from "hooks/useSignInForm";

import { UserCredentials } from "types/User";

import fadeConfig from "animation/fade";

interface Props {
	staySignedIn: boolean;
	isLoading: boolean;
	authenticateUser: (credentials: UserCredentials) => void;
	setStaySignedIn: (checked: boolean) => void;
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

	const handleCheckboxChange = (checked: boolean) => {
		setStaySignedIn(checked);
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

				<Checkbox
					checkhed={staySignedIn}
					name='remember-me'
					label='Keep me signed in'
					onChange={handleCheckboxChange}
				/>

				<button type='submit' disabled={isLoading} className='sign-in__btn-submit' formNoValidate>
					Sign in
				</button>
			</form>

			<div className='d-flex justify-center align-center'>
				<p className='mr-2'>Don't have an account yet?</p>

				<Link to={`${match.path}/register`} className='login-page__link'>
					Sign up
				</Link>
			</div>
		</animated.div>
	);
};

export default SignIn;
