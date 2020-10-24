import { useState, useEffect } from "react";
import validate from "./validate";

const useSignUpForm = (callback) => {
	const [info, setInfo] = useState({
		name: "",
		surname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInfo({
			...info,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setErrors(validate(info));
		setIsSubmitting(true);
	};

	useEffect(() => {
		Object.keys(errors).length === 0 && isSubmitting && callback(info);
	});

	return { info, handleChange, handleSubmit, errors };
};

export default useSignUpForm;
