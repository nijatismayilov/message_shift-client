import axios from "axios";
import { getToken } from "utils/localStorage";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api",
	responseType: "json",
	headers: {
		"Content-type": "application/json",
	},
});

axiosInstance.interceptors.request.use((req) => {
	let token = getToken();
	req.headers.Authorization = `Bearer ${token}`;

	return req;
});

axiosInstance.interceptors.response.use(null, (err) => {
	throw new Error(err.response.data.message);
});

export default axiosInstance;
