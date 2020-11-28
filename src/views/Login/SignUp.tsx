import React from "react";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import useSignUpForm from "hooks/useSignUpForm";

import TextField from "components/TextField";

import { UserInfo } from "types/User";

import fadeConfig from "animation/fade";

interface Props {
	isLoading: boolean;
	registerUser: (userInfo: UserInfo) => void;
}

const SignUp: React.FC<Props> = (props) => {
	const { isLoading } = props;
	const { registerUser } = props;

	const history = useHistory();

	const { info, errors, handleChange, handleSubmit } = useSignUpForm(registerUser);

	const fade = useSpring(fadeConfig);

	const handleTextFieldChange = (value: string, name: string): void => {
		const input = {
			name,
			value,
		};

		handleChange(input);
	};

	return (
		<animated.div style={fade} className='w-100'>
			<form className='sign-in' onSubmit={handleSubmit}>
				<TextField
					type='text'
					name='name'
					label='Firstname'
					value={info.name}
					error={errors.name}
					onChange={(value) => handleTextFieldChange(value, "name")}
				/>

				<TextField
					type='text'
					name='surname'
					label='Surname'
					value={info.surname}
					error={errors.surname}
					onChange={(value) => handleTextFieldChange(value, "surname")}
				/>

				<TextField
					type='email'
					name='email'
					label='Email'
					value={info.email}
					error={errors.email}
					onChange={(value) => handleTextFieldChange(value, "email")}
				/>

				<TextField
					type='password'
					name='password'
					label='Password'
					value={info.password}
					error={errors.password}
					onChange={(value) => handleTextFieldChange(value, "password")}
				/>

				<TextField
					type='password'
					name='confirmPassword'
					label='Confirm Password'
					value={info.confirmPassword}
					error={errors.confirmPassword}
					onChange={(value) => handleTextFieldChange(value, "confirmPassword")}
				/>

				<button type='submit' disabled={isLoading} className='sign-in__btn-submit' formNoValidate>
					Sign up
				</button>
			</form>

			<div className='d-flex justify-center align-center'>
				<p>Already have an account?</p>

				<button onClick={history.goBack} className='login-page__link'>
					Sign in
				</button>
			</div>
		</animated.div>
	);
};

export default SignUp;
