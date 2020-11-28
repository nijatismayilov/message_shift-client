export interface UserInfo {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface Errors {
	name?: string;
	surname?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

const validateSignInInfo = (info: UserInfo) => {
	let errors: Errors = {};

	if (!info.name) errors.name = "Firstname should not be empty";

	if (!info.surname) errors.surname = "Surname should not be empty";

	if (!info.email) errors.email = "Email should not be empty";
	else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(info.email))
		errors.email = "Please enter a valid email address";

	if (!info.password) errors.password = "Password should not be empty";
	else if (info.password.length < 6)
		errors.password = "Password should contain at least 6 characters";

	if (!info.confirmPassword || info.password !== info.confirmPassword)
		errors.confirmPassword = "Passwords do not match";

	return errors;
};

export default validateSignInInfo;
