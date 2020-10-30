import axios from "axios";
import store from "store";

import { clearUserState } from "store/user/actions";

import dispatchNewNotification from "utils/dispatchNewNotification";

import {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
	removeAccessToken,
	removeRefreshToken,
	removeStaySignedIn,
} from "utils/localStorage";

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

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
	let token = getAccessToken();
	req.headers.Authorization = `Bearer ${token}`;

	return req;
});

axiosInstance.interceptors.response.use(null, async (error) => {
	const errorResponse = error.response;
	if (isTokenExpiredError(errorResponse)) {
		return resetTokenAndReattemptRequest(error);
	} else {
		createNewError(error);
	}
});

const isTokenExpiredError = (errorResponse) => {
	const {
		error: { status, message },
	} = errorResponse.data;

	if (status === 401 && message === "jwt expired") return true;
	else return false;
};

const resetTokenAndReattemptRequest = async (error) => {
	try {
		const { response: errorResponse } = error;
		const refreshToken = await getRefreshToken();

		if (!refreshToken) {
			createNewError(error);
		}

		const retryOriginalRequest = new Promise((resolve) => {
			addSubscriber((access_token) => {
				errorResponse.config.headers.Authorization = `Bearer ${access_token}`;
				resolve(axios(errorResponse.config));
			});
		});

		if (!isAlreadyFetchingAccessToken) {
			isAlreadyFetchingAccessToken = true;
			const response = await axios({
				method: "post",
				url: `${process.env.REACT_APP_BASE_URL_DEVELOPMENT}/auth/refreshtoken`,
				data: {
					refreshToken,
				},
			});

			if (!response.data) {
				createNewError(error);
			}

			const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
			await setAccessToken(newAccessToken);
			await setRefreshToken(newRefreshToken);

			isAlreadyFetchingAccessToken = false;
			onAccessTokenFetched(newAccessToken);
		}
		return retryOriginalRequest;
	} catch (err) {
		const {
			error: { status, message },
		} = err.response.data;

		if (status === 401 && message === "Please sign in again") {
			dispatchNewNotification("refresh-token-expired", "warning", message);

			await removeAccessToken();
			await removeRefreshToken();
			await removeStaySignedIn();

			store.dispatch(clearUserState());

			const newError = new Error(message);
			newError.status = status;
			throw newError;
		} else {
			createNewError(err);
		}
	}
};

const onAccessTokenFetched = (accessToken) => {
	subscribers.forEach((callback) => callback(accessToken));
	subscribers = [];
};

const addSubscriber = (callback) => {
	subscribers.push(callback);
};

const createNewError = (err) => {
	const {
		error: { status, message },
	} = err.response.data;

	dispatchNewNotification("api-request", "error", message);

	const newError = new Error(message);
	newError.status = status;
	throw newError;
};

export default axiosInstance;
