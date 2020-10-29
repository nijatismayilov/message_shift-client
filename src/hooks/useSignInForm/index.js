import { useState, useEffect } from "react";
import validate from "./validate";

const useSignInForm = (callback) => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({
			...credentials,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setErrors(validate(credentials));
		setIsSubmitting(true);
	};

	useEffect(() => {
		Object.keys(errors).length === 0 &&
			isSubmitting &&
			callback({ credentials }) &&
			setIsSubmitting(false);
	}, [errors, isSubmitting, setIsSubmitting, credentials, callback]);

	return { credentials, handleChange, handleSubmit, errors };
};

export default useSignInForm;
