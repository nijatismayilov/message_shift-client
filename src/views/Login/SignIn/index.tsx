import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useFormik } from "formik";

import { authPayload } from "store/auth/actions";

import TextField from "components/FormControls/TextField";
import Checkbox from "components/FormControls/Checkbox";

import fadeConfig from "animation/fade";

import { initialValues, validationSchema, validationTiming } from "./signInForm";

interface Props {
	isLoading: boolean;
	authenticateUser: (payload: authPayload) => void;
}

const SignIn: React.FC<Props> = (props) => {
	const { isLoading } = props;
	const { authenticateUser } = props;

	const match = useRouteMatch();

	const fade = useSpring(fadeConfig);

	const formik = useFormik({
		initialValues,
		onSubmit: handleFormikSubmit,
		validationSchema,
		...validationTiming,
	});

	const { values, errors } = formik;
	const { handleChange, handleBlur, handleSubmit } = formik;

	function handleFormikSubmit() {
		authenticateUser(values);
	}

	return (
		<animated.div style={fade} className='w-100'>
			<form className='sign-in' onSubmit={handleSubmit}>
				<TextField
					type='email'
					name='email'
					label='Your Email'
					error={errors.email}
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<TextField
					type='password'
					name='password'
					label='Your Password'
					error={errors.password}
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<Checkbox
					checkhed={values.willStayAuth}
					name='willStayAuth'
					label='Keep me signed in'
					onChange={handleChange}
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
