import * as Yup from "yup";

enum Errors {
	EMAIL_REQUIRED = "Email should not be empty",
	EMAIL_INVALID = "Please enter a valid email",
	PASSWORD_REQUIRED = "Password should not be empty",
}

interface SignInForm {
	email: string;
	password: string;
	willStayAuth: boolean;
}

export const initialValues: SignInForm = {
	email: "",
	password: "",
	willStayAuth: false,
};

export const validationSchema = Yup.object({
	email: Yup.string().required(Errors.EMAIL_REQUIRED).email(Errors.EMAIL_INVALID),
	password: Yup.string().required(Errors.PASSWORD_REQUIRED),
});

export const validationTiming = {
	validateOnChange: false,
	validateOnBlur: false,
};
