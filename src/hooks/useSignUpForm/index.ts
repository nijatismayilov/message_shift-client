import { useState, useEffect } from "react";
import validate from "./validate";

type Callback = (arg: any) => void;

const useSignUpForm = (callback: Callback) => {
	const [info, setInfo] = useState({
		name: "",
		surname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setInfo({
			...info,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFontElement>): void => {
		e.preventDefault();

		setErrors(validate(info));
		setIsSubmitting(true);
	};

	useEffect(() => {
		Object.keys(errors).length === 0 &&
			isSubmitting &&
			callback({ ...info, confirmPassword: undefined }) &&
			setIsSubmitting(false);
	}, [errors, isSubmitting, callback, info, setIsSubmitting]);

	return { info, handleChange, handleSubmit, errors };
};

export default useSignUpForm;
