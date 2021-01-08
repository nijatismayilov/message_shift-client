import React from "react";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useFormik } from "formik";

import TextField from "components/FormControls/TextField";

import { UserInfo } from "types/User";

import generateKey from "utils/generateKey";

import fadeConfig from "animation/fade";

import { initialValues, validationSchema, validationTiming } from "./signUpForm";

interface Props {
	isLoading: boolean;
	registerUser: (userInfo: UserInfo) => void;
}

const SignUp: React.FC<Props> = (props) => {
	const { isLoading } = props;
	const { registerUser } = props;

	const history = useHistory();

	const formik = useFormik({
		initialValues,
		onSubmit: handleFormikSubmit,
		validationSchema,
		...validationTiming,
	});

	const { values, errors } = formik;
	const { handleChange, handleBlur, handleSubmit } = formik;

	const fade = useSpring(fadeConfig);

	function handleFormikSubmit() {
		const payload: UserInfo = {
			name: values.name,
			surname: values.surname,
			email: values.email,
			password: values.password,
		};

		registerUser(payload);
	}

	return (
		<animated.div style={fade} className='w-100'>
			<form className='sign-in' onSubmit={handleSubmit}>
				<TextField
					id={generateKey()}
					type='text'
					name='name'
					label='Firstname'
					value={values.name}
					error={errors.name}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<TextField
					id={generateKey()}
					type='text'
					name='surname'
					label='Surname'
					value={values.surname}
					error={errors.surname}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<TextField
					id={generateKey()}
					type='email'
					name='email'
					label='Email'
					value={values.email}
					error={errors.email}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<TextField
					id={generateKey()}
					type='password'
					name='password'
					label='Password'
					value={values.password}
					error={errors.password}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<TextField
					id={generateKey()}
					type='password'
					name='confirmPassword'
					label='Confirm Password'
					value={values.confirmPassword}
					error={errors.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
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
