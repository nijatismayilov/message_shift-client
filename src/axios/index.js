import axios from "axios";
import { getToken } from "utils/sessionStorage";

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

export default axiosInstance;
