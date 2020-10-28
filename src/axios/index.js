import axios from "axios";
import { getToken as getTokenFromSession } from "utils/sessionStorage";
import { getToken as getTokenFromLocal } from "utils/localStorage";

const baseURl =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_BASE_URL_PRODUCTION
		: process.env.REACT_APP_BASE_URL_DEVELOPMENT;

const axiosInstance = axios.create({
	baseURL: baseURl,
	responseType: "json",
	headers: {
		"Content-type": "application/json",
	},
});

axiosInstance.interceptors.request.use((req) => {
	let token = getTokenFromSession() || getTokenFromLocal();
	req.headers.Authorization = `Bearer ${token}`;

	return req;
});

axiosInstance.interceptors.response.use(null, (err) => {
	const { error } = err.response.data;
	const newError = new Error(error.message);
	newError.status = error.status;
	throw newError;
});

export default axiosInstance;
