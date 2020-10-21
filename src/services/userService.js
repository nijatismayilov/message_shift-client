import axios from "../axios";

const signIn = async (credentials) => {
	try {
		const res = await axios.post("Users/SignIn", credentials);
		return res.data;
	} catch (err) {
		return null;
	}
};

const signUp = async (userData) => {
	try {
		const res = await axios.post("Users/SignUp", userData);
		return res.data;
	} catch (err) {
		return null;
	}
};

const loadDetails = async () => {
	try {
		const res = await axios.get("Users/LoadDetails");
		return res.data;
	} catch (err) {
		return {};
	}
};

export default {
	signIn,
	signUp,
	loadDetails,
};
