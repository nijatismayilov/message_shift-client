import { useState, useEffect } from "react";
import validate, { Errors } from "./validate";
import { UserCredentials } from "types/User";

type Callback = (credentials: UserCredentials) => void;

const useSignInForm = (callback: Callback) => {
	const [credentials, setCredentials] = useState<UserCredentials>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Errors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;

		setCredentials((credentials) => ({
			...credentials,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		setErrors(validate(credentials));
		setIsSubmitting(true);
	};

	useEffect(() => {
		Object.keys(errors).length === 0 &&
			isSubmitting &&
			callback(credentials) &&
			setIsSubmitting(false);
	}, [errors, isSubmitting, setIsSubmitting, credentials, callback]);

	return { credentials, handleChange, handleSubmit, errors };
};

export default useSignInForm;
