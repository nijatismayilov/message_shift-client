import { useState, useEffect } from "react";
import validate, { Errors, UserInfo } from "./validate";

type Callback = (arg: UserInfo) => void;

type ChangeInput = {
	name: string;
	value: string;
};

const useSignUpForm = (callback: Callback) => {
	const [info, setInfo] = useState<UserInfo>({
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
		Object.keys(errors).length === 0 &&
			isSubmitting &&
			callback({ ...info, confirmPassword: "" }) &&
			setIsSubmitting(false);
	}, [errors, isSubmitting, callback, info, setIsSubmitting]);

	return { info, handleChange, handleSubmit, errors };
};

export default useSignUpForm;
