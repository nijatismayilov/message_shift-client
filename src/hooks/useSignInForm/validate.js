const validateSignInInfo = (credentials) => {
	let errors = {};

	if (!credentials.email) errors.email = "Email should not be empty";
	else if (
		!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(credentials.email)
	)
		errors.email = "Please enter a valid email address";

	if (!credentials.password) errors.password = "Password should not be empty";

	return errors;
};

export default validateSignInInfo;
