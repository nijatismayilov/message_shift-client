import axios from "../axios";

const signIn = async (credentials) => await axios.post("auth/signin", credentials);

const signUp = async (userData) => await axios.post("auth/signup", userData);

const refreshToken = async (token) => await axios.post("auth/refreshtoken", token);

const signOut = async (token) => await axios.delete("auth/signout", token);

export default {
	signIn,
	signUp,
	refreshToken,
	signOut,
};
