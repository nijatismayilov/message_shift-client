import { useState, useEffect } from "react";
import validate, { Errors } from "./validate";
import { UserCredentials } from "types/User";

type ChangeInput = {
	name: string;
	value: string;
};

const useSignInForm = () => {
	const [credentials, setCredentials] = useState<UserCredentials>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Errors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [canSubmit, setCanSubmit] = useState(false);

	const handleChange = (input: ChangeInput): void => {
		const { name, value } = input;

		setCredentials((credentials) => ({
			...credentials,
			[name]: value,
		}));

		setErrors((errors) => ({
			...errors,
			[name]: undefined,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		setErrors(validate(credentials));
		setIsSubmitting(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			setCanSubmit(true);
			setIsSubmitting(false);
		}
	}, [errors, isSubmitting, setIsSubmitting, credentials]);

	useEffect(() => {
		if (Object.keys(errors).length !== 0) setCanSubmit(false);
	}, [errors]);

	return { credentials, handleChange, handleSubmit, errors, canSubmit };
};

export default useSignInForm;
