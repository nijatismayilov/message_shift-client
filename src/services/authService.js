import axios from "../axios";

const signIn = async (credentials) => await axios.post("/auth/signin", credentials);

const signUp = async (userData) => await axios.post("/auth/signup", userData);

const refreshToken = async (refreshToken) =>
	await axios.post("/auth/refreshtoken", { refreshToken });

const signOut = async (refreshToken) => {
	await axios.delete(`/auth/signout/${refreshToken}`);
};

export default {
	signIn,
	signUp,
	refreshToken,
	signOut,
};
