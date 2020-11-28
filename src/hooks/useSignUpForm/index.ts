import { useState, useEffect } from "react";

import { UserInfo } from "types/User";

import validate, { Errors, UserInfoCheck } from "./validate";

type Callback = (userInfo: UserInfo) => void;

type ChangeInput = {
	name: string;
	value: string;
};

const useSignUpForm = (callback: Callback) => {
	const [info, setInfo] = useState<UserInfoCheck>({
		name: "",
		surname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<Errors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (input: ChangeInput): void => {
		const { name, value } = input;

		setInfo((info) => ({
			...info,
			[name]: value,
		}));

		setErrors((errors) => ({
			...errors,
			[name]: undefined,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		setErrors(validate(info));
		setIsSubmitting(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			const userInfo: UserInfo = {
				name: info.name,
				surname: info.surname,
				email: info.email,
				password: info.password,
			};

			callback(userInfo);
			setIsSubmitting(false);
		}
	}, [errors, isSubmitting, callback, info, setIsSubmitting]);

	return { info, handleChange, handleSubmit, errors };
};

export default useSignUpForm;
