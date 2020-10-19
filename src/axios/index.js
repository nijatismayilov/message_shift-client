import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/posts",
});

export default axiosInstance;
