import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { authenticateUserStart } from "store/auth/actions";

import TextField from "components/TextField";
import Checkbox from "components/Checkbox";

import useForm, { Rule } from "hooks/useForm";

import fadeConfig from "animation/fade";

interface Props {
	isLoading: boolean;
}

const initialValues = {
	email: "",
	password: "",
	willStayAuth: false,
};

const emailRule: Rule = {
	name: "email",
	isEmpty: false,
	regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};

const passwordRule: Rule = {
	name: "password",
	isEmpty: false,
};

const rules = [emailRule, passwordRule];

const SignIn: React.FC<Props> = (props) => {
	const { isLoading } = props;

	const match = useRouteMatch();
	const dispatch = useDispatch();

	const { values, errors, handleChange, handleSubmit } = useForm(initialValues, rules, handleAuth);

	const fade = useSpring(fadeConfig);

	function handleAuth(values: typeof initialValues) {
		dispatch(authenticateUserStart(values));
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
				/>

				<TextField
					type='password'
					name='password'
					label='Your Password'
					error={errors.password}
					value={values.password}
					onChange={handleChange}
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
