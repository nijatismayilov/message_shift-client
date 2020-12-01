import { useState, useEffect } from "react";

export interface Errors {
	[key: string]: string | undefined;
}

export interface Rule {
	name: string;
	isEmpty?: boolean;
	regex?: RegExp;
	minLength?: number;
}

const useForm = (initialValues: any, rules: Rule[] = [], callback: Function) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState<Errors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const setError = (name: string, value: string | undefined): void => {
		setErrors((errors) => ({ ...errors, [name]: value }));
	};

	const validate = (): Errors => {
		return rules.reduce((newErrors, rule): Errors => {
			const { name } = rule;
			let error: string | undefined;

			if (rule.isEmpty !== undefined && !rule.isEmpty && !values[name])
				error = `${name} should not be empty`;
			else if (rule.regex !== undefined && !rule.regex.test(values[name]))
				error = `Please enter a valid ${name}`;
			else if (rule.minLength !== undefined && values[name].length < rule.minLength)
				error = `${name} should contain at least ${rule.minLength} characters`;
			else error = undefined;

			if (error) newErrors = { ...newErrors, [name]: error };
			return newErrors;
		}, {});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.persist();
		const { name } = e.target;
		let value: string | boolean;

		if (e.target.type === "checkbox") value = e.target.checked;
		else value = e.target.value;

		setValues((values: any) => ({ ...values, [name]: value }));
		setError(name, undefined);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newErrors = validate();
		setErrors(newErrors);
		setIsSubmitting(true);
	};

	useEffect(() => {
		if (Object.values(errors).length === 0 && isSubmitting) {
			callback(values);
			setIsSubmitting(false);
		}
	}, [values, errors, isSubmitting, callback]);

	return { values, errors, handleChange, handleSubmit };
};

export default useForm;
