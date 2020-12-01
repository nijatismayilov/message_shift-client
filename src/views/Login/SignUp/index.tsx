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
					onChange={(e) => handleTextFieldChange(e.target.value, "name")}
				/>

				<TextField
					type='text'
					name='surname'
					label='Surname'
					value={info.surname}
					error={errors.surname}
					onChange={(e) => handleTextFieldChange(e.target.value, "surname")}
				/>

				<TextField
					type='email'
					name='email'
					label='Email'
					value={info.email}
					error={errors.email}
					onChange={(e) => handleTextFieldChange(e.target.value, "email")}
				/>

				<TextField
					type='password'
					name='password'
					label='Password'
					value={info.password}
					error={errors.password}
					onChange={(e) => handleTextFieldChange(e.target.value, "password")}
				/>

				<TextField
					type='password'
					name='confirmPassword'
					label='Confirm Password'
					value={info.confirmPassword}
					error={errors.confirmPassword}
					onChange={(e) => handleTextFieldChange(e.target.value, "confirmPassword")}
				/>

				<button type='submit' disabled={isLoading} className='sign-in__btn-submit' formNoValidate>
					Sign up
				</button>
			</form>

			<div className='d-flex justify-center align-center'>
				<p className='mr-2'>Already have an account?</p>

				<button onClick={history.goBack} className='login-page__link'>
					Sign in
				</button>
			</div>
		</animated.div>
	);
};

export default SignUp;
