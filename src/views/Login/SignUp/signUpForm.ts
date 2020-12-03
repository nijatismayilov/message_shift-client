import * as Yup from "yup";

interface SignUpForm {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

enum ErrorMessages {
	NAME_REQUIRED = "Firstname should not be empty",
	SURNAME_REQUIRED = "Surname should not be empty",
	EMAIL_REQUIRED = "Email should not be empty",
	EMAIL_INVALID = "Please enter a valid email address",
	PASSWORD_REQUIRED = "Password should not be empty",
	PASSWORD_MIN_LENGTH = "Password should contain at least 6 characters",
	PASSWORD_MATCH = "Passwords do not match",
}

export const initialValues: SignUpForm = {
	name: "",
	surname: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export const validationSchema = Yup.object({
	name: Yup.string().required(ErrorMessages.NAME_REQUIRED),
	surname: Yup.string().required(ErrorMessages.SURNAME_REQUIRED),
	email: Yup.string().required(ErrorMessages.EMAIL_REQUIRED).email(ErrorMessages.EMAIL_INVALID),
	password: Yup.string()
		.required(ErrorMessages.PASSWORD_REQUIRED)
		.min(6, ErrorMessages.PASSWORD_MIN_LENGTH),
	confirmPassword: Yup.string()
		.required(ErrorMessages.PASSWORD_REQUIRED)
		.oneOf([Yup.ref("password"), ""], ErrorMessages.PASSWORD_MATCH),
});

export const validationTiming = {
	validateOnChange: false,
	validateOnBlur: false,
};
