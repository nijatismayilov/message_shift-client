import axios, { AxiosResponse } from "axios";
import store from "store";

import { logoutUserSuccess } from "store/auth/actions";
import { clearUserState } from "store/user/actions";

import dispatchNotification from "utils/dispatchNotification";

import { NotificationTypes } from "types/Notification";

import * as localStorage from "utils/localStorage";
import * as sessionStorage from "utils/sessionStorage";

let isAlreadyFetchingAccessToken = false;
let subscribers: Function[] = [];

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
	let token = localStorage.getAccessToken() || sessionStorage.getAccessToken();
	req.headers.Authorization = `Bearer ${token}`;

	return req;
});

axiosInstance.interceptors.response.use(
	(req) => req,
	async (error) => {
		const errorResponse = error.response;

		if (!errorResponse)
			dispatchNotification("api-request", NotificationTypes.ERROR, "Please try again later");
		else if (isAttempUnauthorized(errorResponse)) {
			store.dispatch(logoutUserSuccess());
			store.dispatch(clearUserState());
		} else if (isTokenExpiredError(errorResponse)) {
			return resetTokenAndReattemptRequest(error);
		} else createNewError(error);
	}
);

const isAttempUnauthorized = (errorResponse: AxiosResponse) => {
	const {
		error: { status, message },
	} = errorResponse.data;

	if (status === 401 && message === "Unauthorized") return true;
	else return false;
};

const isTokenExpiredError = (errorResponse: AxiosResponse) => {
	const {
		error: { status, message },
	} = errorResponse.data;

	if (status === 401 && message === "jwt expired") return true;
	else return false;
};

const resetTokenAndReattemptRequest = async (error: any) => {
	try {
		const { response: errorResponse } = error;
		const refreshToken = localStorage.getRefreshToken() || sessionStorage.getRefreshToken();

		if (!refreshToken) {
			createNewError(error);
		}

		const retryOriginalRequest = new Promise((resolve) => {
			addSubscriber((access_token: string) => {
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
			localStorage.setAccessToken(newAccessToken);
			localStorage.setRefreshToken(newRefreshToken);

			isAlreadyFetchingAccessToken = false;
			onAccessTokenFetched(newAccessToken);
		}
		return retryOriginalRequest;
	} catch (err) {
		const {
			error: { status, message },
		} = err.response.data;

		if (status === 401 && message === "Please sign in again") {
			dispatchNotification("refresh-token-expired", NotificationTypes.ERROR, message);

			localStorage.removeAccessToken();
			localStorage.removeRefreshToken();

			sessionStorage.removeAccessToken();
			sessionStorage.removeRefreshToken();

			store.dispatch(clearUserState());

			const newError = new Error(message);
			throw newError;
		} else {
			createNewError(err);
		}
	}
};

const onAccessTokenFetched = (accessToken: string) => {
	subscribers.forEach((callback) => callback(accessToken));
	subscribers = [];
};

const addSubscriber = (callback: Function) => {
	subscribers.push(callback);
};

const createNewError = (err: any) => {
	const {
		error: { message },
	} = err.response.data;

	dispatchNotification("api-request", NotificationTypes.ERROR, message);

	const newError = new Error(message);
	throw newError;
};

export default axiosInstance;
